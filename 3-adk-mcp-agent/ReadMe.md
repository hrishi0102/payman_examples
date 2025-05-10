## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/hrishi0102/payman_examples.git
cd 3-adk-mcp-agent
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables:

```bash
cp .env.example .env
```

5. Edit the `.env` file and add your Google API key:

```
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GOOGLE_API_KEY=YOUR_API_KEY_HERE
```

6. Each example can be run individually. Here's how to run the basic session example:

```bash
cd payman_agent
```

Run the web agent using ADK Web UI

```bash
adk web
```
