import { useState } from "react";
import { Clock, AlertCircle, User } from "lucide-react";
import orderB2CIcon from "../images/workflows/order_b2c.png";

interface WorkflowStep {
  stage: string;
  actor: string;
  actions: string[];
  systems?: string[];
  duration?: string;
  exitPoints?: string[];
  decision?: string;
  triggers?: string[];
  alerts?: string[];
  escalation?: string;
  payment?: string;
  SLA?: string;
}

interface Workflow {
  name: string;
  // can be an emoji character or an image URL
  icon: React.ReactNode;
  color: string;
  steps: WorkflowStep[];
}

const WorkflowsDashboard = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("order_b2c");

  const workflows: Record<string, Workflow> = {
    order_b2c: {
      name: "B2C Order (Client Direct Purchase)",
      // imported image for workflow icon
      icon: <img src={orderB2CIcon} alt="B2C order" style={{width:24, height:24}} />, 
      color: "#3b82f6",
      steps: [
        {
          stage: "Discovery & Selection",
          actor: "Client",
          actions: [
            "Browse website/showroom",
            "Filter products by room/style/specs",
            "View AR visualization in own space",
            "Add to cart / Save to wishlist",
            "Request free design consultation (optional)",
          ],
          systems: ["Website", "Product DB", "AR Module"],
          duration: "30 min - 2 days",
          exitPoints: ["Abandon cart", "Save for later"],
        },
        {
          stage: "Quotation & Design",
          actor: "Interior Designer (if opted) / Self-service",
          actions: [
            "Upload room dimensions/floor plan",
            "AI generates lighting layout suggestions",
            "Customize quantities & positions",
            "Generate quotation with 3D renders",
            "Email quotation link to client",
          ],
          systems: ["AI Quotation Engine", "3D Render", "Email Gateway"],
          duration: "2-24 hours",
          decision: "Client approves quotation?",
        },
        {
          stage: "Order Placement",
          actor: "Client",
          actions: [
            "Review cart & apply discount codes",
            "Select delivery address",
            "Choose payment method (online/COD/EMI)",
            "Add installation service (Yes/No)",
            "Confirm order",
          ],
          systems: ["Cart", "Payment Gateway", "Order Management"],
          duration: "10-20 minutes",
          triggers: ["Order confirmation email", "SMS", "WhatsApp notification"],
        },
        {
          stage: "Order Processing",
          actor: "Warehouse Team",
          actions: [
            "Order auto-routed to nearest warehouse",
            "Pick products from inventory",
            "QC check (physical damage, correct SKU)",
            "Scan QR codes → link to order",
            "Pack with bubble wrap + Lumific branding",
            "Generate shipping label",
          ],
          systems: ["WMS", "QR Scanner", "Inventory DB"],
          duration: "4-24 hours",
          alerts: ["If out-of-stock → notify client + offer alternatives"],
        },
        {
          stage: "Dispatch & Delivery",
          actor: "Delivery Partner",
          actions: [
            "Assign to delivery partner via app",
            "Partner picks up from warehouse",
            "Real-time GPS tracking",
            "Call client 30min before arrival",
            "Deliver + capture photo proof + digital signature",
            "Upload to system",
          ],
          systems: ["Delivery App", "GPS Tracking", "POD Module"],
          duration: "1-7 days (based on location)",
          escalation: "If delivery failed → reschedule or RTO",
        },
        {
          stage: "Installation (Optional)",
          actor: "Electrician",
          actions: [
            "Schedule appointment via client portal",
            "Electrician receives job assignment",
            "Arrive at site with tools",
            "Use AR-guided installation app",
            "Test lux levels with app",
            "Capture before/after photos",
            "Client signs off digitally",
            "Auto-activate warranty",
          ],
          systems: ["Installation App", "QR Activation", "Warranty DB"],
          duration: "2-6 hours",
          payment: "Electrician earns loyalty points",
        },
        {
          stage: "Post-Purchase",
          actor: "Client",
          actions: [
            "Receive warranty certificate via email",
            "Access product manuals in portal",
            "Rate delivery & installation",
            "Auto-enrolled in loyalty program",
            "Receive care tips & energy reports",
          ],
          systems: ["CRM", "Email Marketing", "Customer Portal"],
          duration: "Ongoing",
          triggers: ["AMC renewal reminder at 11 months", "Cross-sell suggestions"],
        },
      ],
    },
  };

  const workflow = workflows[selectedWorkflow];

  const getStatusIcon = (duration?: string) => {
    if (!duration) return null;
    if (duration.includes("minutes") || duration.includes("hours"))
      return <Clock size={16} color="#f59e0b" />;
    if (duration.includes("days"))
      return <AlertCircle size={16} color="#3b82f6" />;
    return <Clock size={16} color="#64748b" />;
  };

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
        End-to-End Business Workflows
      </h1>

      {/* WORKFLOW TABS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(workflows).map(([key, wf]) => (
          <button
            key={key}
            onClick={() => setSelectedWorkflow(key)}
            style={{
              padding: "12px 20px",
              background: selectedWorkflow === key ? wf.color : "#fff",
              color: selectedWorkflow === key ? "#fff" : "#1e293b",
              border: `2px solid ${wf.color}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px", display: 'flex', alignItems: 'center' }}>{wf.icon}</span>
            {wf.name}
          </button>
        ))}
      </div>

      {/* HEADER */}
      <div
        style={{
          background: "#fff",
          border: "2px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: workflow.color,
            color: "#fff",
            padding: "20px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "32px" }}>{workflow.icon}</span>
          <div>
            <h2 style={{ margin: 0, fontSize: "24px" }}>{workflow.name}</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>
              {workflow.steps.length} stages • End-to-end process flow
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div style={{ padding: "24px" }}>
          {workflow.steps.map((step, idx) => (
            <div key={idx} style={{ marginBottom: "32px", position: "relative" }}>
              {idx < workflow.steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "60px",
                    bottom: "-32px",
                    width: "2px",
                    background: "#e2e8f0",
                  }}
                />
              )}

              <div style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: workflow.color,
                    borderRadius: "50%",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "18px",
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      padding: "16px",
                      borderRadius: "8px",
                    }}
                  >
                    {/* TITLE */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: "0 0 4px 0",
                            fontSize: "18px",
                            fontWeight: 700,
                          }}
                        >
                          {step.stage}
                        </h3>
                        <div
                          style={{ display: "flex", alignItems: "center", gap: 8 }}
                        >
                          <User size={16} />
                          <strong>{step.actor}</strong>
                        </div>
                      </div>

                      {step.duration && (
                        <div
                          style={{
                            padding: "4px 12px",
                            borderRadius: 6,
                            background: "#fef3c7",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {getStatusIcon(step.duration)}
                          {step.duration}
                        </div>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div style={{ marginBottom: 12 }}>
                      <strong>Actions:</strong>
                      <ul>
                        {step.actions?.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    {/* SYSTEMS */}
                    {step.systems && (
                      <div style={{ marginBottom: 12 }}>
                        <strong>Systems:</strong>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {step.systems.map((sys, i) => (
                            <span
                              key={i}
                              style={{
                                background: "#dbeafe",
                                padding: "4px 10px",
                                borderRadius: 4,
                              }}
                            >
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* DECISION */}
                    {step.decision && (
                      <div
                        style={{
                          background: "#fef3c7",
                          border: "1px solid #fbbf24",
                          padding: "10px",
                          borderRadius: 6,
                          marginTop: 8,
                        }}
                      >
                        <AlertCircle size={18} /> Decision: {step.decision}
                      </div>
                    )}

                    {/* TRIGGERS */}
                    {step.triggers && (
                      <div
                        style={{
                          background: "#dcfce7",
                          border: "1px solid #22c55e",
                          padding: "10px",
                          borderRadius: 6,
                          marginTop: 8,
                        }}
                      >
                        <strong>Auto-Triggers:</strong> {step.triggers.join(", ")}
                      </div>
                    )}

                    {/* ALERTS */}
                    {step.alerts && (
                      <div
                        style={{
                          background: "#fee2e2",
                          border: "1px solid #ef4444",
                          padding: "10px",
                          borderRadius: 6,
                          marginTop: 8,
                        }}
                      >
                        <strong>Alerts:</strong> {step.alerts.join(", ")}
                      </div>
                    )}

                    {/* SLA */}
                    {step.SLA && (
                      <div
                        style={{
                          background: "#e0e7ff",
                          border: "1px solid #6366f1",
                          padding: "10px",
                          borderRadius: 6,
                          marginTop: 8,
                        }}
                      >
                        <strong>SLA:</strong> {step.SLA}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Rules */}
      <div
        style={{
          marginTop: 32,
          padding: 20,
          background: "#f1f5f9",
          borderRadius: 8,
          border: "1px solid #cbd5e1",
        }}
      >
        <h3>Workflow Automation Rules</h3>
        <ul>
          <li>Auto-assign to nearest warehouse</li>
          <li>SLA escalation matrix</li>
          <li>Stock &lt; 10 units → alert sales</li>
          <li>Payment auto-reminders</li>
          <li>Warranty auto-activation via QR</li>
          <li>AMC expiry → downgrade support</li>
          <li>Loyalty auto-credit</li>
          <li>Feedback auto-trigger</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkflowsDashboard;