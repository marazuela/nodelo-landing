export interface MCPSource {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  dataTypes: string[];
}

export const MCP_CATALOG: MCPSource[] = [
  { id: "hubspot", name: "HubSpot", description: "CRM with contacts, companies, and deals", category: "CRM", icon: "📊", dataTypes: ["contacts", "companies", "deals"] },
  { id: "salesforce", name: "Salesforce", description: "Enterprise CRM with leads, accounts, and opportunities", category: "CRM", icon: "☁️", dataTypes: ["leads", "accounts", "opportunities", "contacts"] },
  { id: "gmail", name: "Gmail", description: "Email threads and messages from Google Workspace", category: "Email", icon: "📧", dataTypes: ["threads"] },
  { id: "outlook", name: "Outlook", description: "Email and calendar from Microsoft 365", category: "Email", icon: "📬", dataTypes: ["messages", "events"] },
  { id: "gdrive", name: "Google Drive", description: "Documents, spreadsheets, and files", category: "Documents", icon: "📁", dataTypes: ["documents"] },
  { id: "notion", name: "Notion", description: "Pages, databases, and wikis", category: "Documents", icon: "📝", dataTypes: ["pages", "databases"] },
  { id: "dropbox", name: "Dropbox", description: "Files and folders", category: "Documents", icon: "📦", dataTypes: ["documents"] },
  { id: "slack", name: "Slack", description: "Messages and channels from your workspace", category: "Communication", icon: "💬", dataTypes: ["messages", "channels"] },
  { id: "github", name: "GitHub", description: "Repositories, issues, and pull requests", category: "Dev / Project", icon: "💻", dataTypes: ["repositories", "issues", "pull_requests"] },
  { id: "linear", name: "Linear", description: "Issues, projects, and cycles", category: "Dev / Project", icon: "🎯", dataTypes: ["issues", "projects"] },
  { id: "jira", name: "Jira", description: "Issues, projects, and boards from Atlassian", category: "Dev / Project", icon: "📋", dataTypes: ["issues", "projects"] },
  { id: "stripe", name: "Stripe", description: "Customers, payments, and subscriptions", category: "Finance", icon: "💳", dataTypes: ["customers", "payments", "subscriptions"] },
];

export function getCategories(): string[] {
  const seen = new Set<string>();
  const cats: string[] = [];
  for (const entry of MCP_CATALOG) {
    if (!seen.has(entry.category)) {
      seen.add(entry.category);
      cats.push(entry.category);
    }
  }
  return cats;
}
