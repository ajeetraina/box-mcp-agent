# Moby README Analyzer Agent

A complete Docker Compose system that analyzes README files from the [compose-for-agents](https://github.com/docker/compose-for-agents) repository and uploads comprehensive analysis reports to Box using MCP (Model Context Protocol).

## Features

- **One-command startup**: `docker compose up`  
- **Multiple chat interfaces**: FastAPI UI, React UI, and OpenWebUI  
- **AI-powered analysis**: Uses Mistral 7B via Docker Model Runner  
- **Comprehensive reports**: Individual and comparative analysis  
- **Box integration**: Automatic upload via MCP Gateway  
- **Real-time progress**: Live updates during analysis  

##  Quick Start

### Prerequisites
- Docker Desktop with Model Runner enabled
- Box MCP server configured with Client ID and tokens (included with Docker MCP Toolkit)
- At least 8GB RAM (for Mistral 7B model)

### 1. Start the System
```bash
docker compose up --build
```

### 2. Access Interfaces
| Interface | URL | Description |
|-----------|-----|-------------|
| **Main Agent** | http://localhost:7777 | Built-in FastAPI chat interface |
| **React UI** | http://localhost:3001 | Alternative React-based UI |
| **OpenWebUI** | http://localhost:3000 | Full-featured chat interface |

### 3. Run Analysis
1. Open any interface
2. Type `analyze readme` or click "🔍 Analyze READMEs"
3. Watch the progress as it:
   - 📥 Clones compose-for-agents repository
   - 🔍 Finds all README files
   - 🧠 Analyzes each with AI
   - 📊 Creates comparative insights
   - 📤 Uploads to Box

## 🏗️ Architecture

```mermaid
graph TB
    A[Web Browser] --> B[Agent Service]
    B --> C[MCP Gateway]
    B --> D[Docker Model Runner]
    C --> E[Box MCP Server]
    D --> F[Mistral 7B Model]
    
    subgraph "Chat Interfaces"
        A1[FastAPI UI :7777]
        A2[React UI :3001]
        A3[OpenWebUI :3000]
    end
    
    subgraph "Analysis Pipeline"
        B1[Repository Clone]
        B2[README Discovery]
        B3[AI Analysis]
        B4[Report Generation]
        B5[Box Upload]
    end
```

## 📋 Usage

### Chat Commands
- `analyze readme` - Start full README analysis
- `status` - Check system status  
- `help` - Show available commands

### Analysis Process
1. **Repository Sync**: Clones/updates compose-for-agents repo
2. **File Discovery**: Scans for all README.md files
3. **Individual Analysis**: AI analyzes each README for:
   - Project overview and purpose
   - Key technologies and architecture
   - Setup instructions and requirements
   - Notable features and patterns
4. **Comparative Analysis**: Cross-project insights including:
   - Common architectural patterns
   - Technology trends
   - Best practices
   - Use case diversity
5. **Report Generation**: Creates comprehensive markdown report
6. **Box Upload**: Saves timestamped report to Box

## 📊 Sample Output

The generated report includes:

```markdown
# 📊 Compose-for-Agents README Analysis Report

**Generated:** 2025-09-10 14:30:25  
**Total Files Analyzed:** 8  
**Repository:** docker/compose-for-agents

## 1. agno/README.md
**Path:** `agno/README.md`  
**Size:** 2,341 characters  

### Analysis:
[Detailed AI analysis of the Agno project...]

## 2. github-summarizer/README.md
[Additional project analyses...]

# Comparative Analysis

## Common Patterns
- Most projects use FastAPI for web services
- Docker Compose with multi-service architectures
- MCP integration for external tool access

## Technology Trends
[AI-generated insights about technology usage...]
```

## Configuration

### Model Settings
```yaml
models:
  mistral-small:
    model: ai/mistral:7B-Q4_0  # ~4.1 GB
    context_size: 8192         # Adjust based on VRAM
```

### Environment Variables
- `MODEL_RUNNER_URL`: Docker Model Runner endpoint
- `MODEL_RUNNER_MODEL`: Model identifier  
- `MCPGATEWAY_URL`: MCP Gateway connection
- `AGENT_PORT`: Main agent port (default: 7777)

## Development

### File Structure
```
readme-analyzer-agent/
├── compose.yaml              # Main orchestration
├── agent/
│   ├── main.py              # Core agent logic
│   ├── Dockerfile           # Agent container
│   └── requirements.txt     # Python dependencies
├── ui/
│   ├── src/                 # React components
│   ├── Dockerfile           # UI container
│   └── package.json         # Node dependencies
├── .env                     # Environment config
└── README.md               # This file
```






