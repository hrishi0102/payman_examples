import asyncio
from agents import Agent, Runner, gen_trace_id, trace
from agents.mcp import MCPServer, MCPServerStdio
from dotenv import load_dotenv

load_dotenv()

async def main():
    async with MCPServerStdio(
        # Use your own MCP server path
        params={
            "command": "node",
            "args": ["/Users/hrishi0102/Developer/Experiments/payman_mcp/build/payman-server.js"]
        }
    ) as server:
        tools = await server.list_tools()
        trace_id = gen_trace_id()
        with trace(workflow_name="MCP Payman", trace_id=trace_id):
            print(f"View trace: https://platform.openai.com/traces/trace?trace_id={trace_id}\n")
            print(f"Tools: {tools}")

        agent = Agent(
            name="Payman Agent",
            instructions="Help user in Payman related operations such as setting api key, setting up new payee, sending money, etc.",
            mcp_servers=[server] 
        )

        result = await Runner.run(agent, "for payman ai can you set the api key: 'YWd0LTFmMDI5YzI2LWI3MWEtNmE4OS05ZTAzLTI1NWEzZDg0ZjNiNTp6WUcyZ3Z6SnYxQWFPUTdEZFRUaEhldkNwMA==',  and then send 1.00 to payee id: pd-1f01fb23-35db-6cc6-89a4-5d6585b93e31")
        print(result.final_output)

# Run the main async function
if __name__ == "__main__":
    asyncio.run(main())
