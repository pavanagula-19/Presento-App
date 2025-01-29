import { useEffect } from "react";
import mermaid from "mermaid";
import axios from "axios";

export default function Planning() {
  const api_key = import.meta.env.VITE_TRELLO_API_KEY;
  const token = import.meta.env.VITE_TRELLO_TOKEN;

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });

    const diagram = `
      graph TD;
        A[Start] --> B{Is it?};
        B -->|Yes| C[OK];
        B -->|No| D[Not OK];
    `;

    const renderMermaidDiagram = async () => {
      const elementId = "mermaid";
      const element = document.getElementById(elementId);

      try {
        if (element) {
          const { svg } = await mermaid.render("theGraph", diagram);
          element.innerHTML = svg;
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
      }
    };

    renderMermaidDiagram();

    const fetchTrelloData = async () => {
      try {
        const response = await axios.get(
          "https://api.trello.com/1/members/me/boards",
          {
            params: {
              key: api_key,
              token: token,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Trello data:", error);
      }
    };

    fetchTrelloData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Planning Tools</h1>
      <div id="mermaid" className="mb-4"></div>
    </div>
  );
}
