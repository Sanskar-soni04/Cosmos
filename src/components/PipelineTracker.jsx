import React from 'react';
import { 
  FileText, 
  Cpu, 
  CheckCircle, 
  Users, 
  Eye, 
  Award, 
  AlertTriangle, 
  RotateCcw,
  GitBranch,
  ArrowRight
} from 'lucide-react';

export function PipelineTracker({ 
  selectedRoute, 
  setSelectedRoute, 
  currentStageIndex, 
  isFixed, 
  institution 
}) {
  // Permitted AICTE Approval Process Handbook (APH 2026-27) Workflow Routes
  const availableRoutes = [
    { id: 'Scrutiny + EVC', label: 'Scrutiny + EVC (Default)', desc: 'For intake expansion or new courses' },
    { id: 'Only Scrutiny', label: 'Only Scrutiny', desc: 'For routine extension / autonomous institutions' },
    { id: 'EVC + SAC/SHC', label: 'EVC + SAC/SHC', desc: 'Appellate hearing & disputed cases' },
    { id: 'Only EVC', label: 'Only EVC', desc: 'Surprise inspection / standalone infrastructure check' },
  ];

  // Pipeline stages mapped to selected route
  const getStagesForRoute = (route) => {
    switch (route) {
      case 'Only Scrutiny':
        return [
          { name: 'Intake & Dossier', icon: FileText, sub: 'Applicant Submission' },
          { name: '6-Agent AI Scrutiny', icon: Cpu, sub: 'Parallel OCR Scan' },
          { name: 'Rules & Score', icon: CheckCircle, sub: 'Deterministic Engine' },
          { name: 'Scrutiny Committee', icon: Users, sub: 'Human Verification' },
          { name: 'Final Approval (EoA)', icon: Award, sub: 'Letter of Approval' }
        ];
      case 'EVC + SAC/SHC':
        return [
          { name: 'Intake & Appeal', icon: FileText, sub: 'Grievance / Appeal' },
          { name: 'AI Re-Scrutiny', icon: Cpu, sub: 'Specialist Extraction' },
          { name: 'EVC Inspection', icon: Eye, sub: 'Physical / Virtual Audit' },
          { name: 'SAC Appellate Hearing', icon: Users, sub: 'Standing Appellate Committee' },
          { name: 'Statutory Verdict', icon: Award, sub: 'Final AICTE Council Order' }
        ];
      case 'Only EVC':
        return [
          { name: 'Inspection Order', icon: FileText, sub: 'Bureau Directive' },
          { name: 'Site Data Intake', icon: Cpu, sub: 'GPS-tagged Dossier' },
          { name: 'EVC Committee Visit', icon: Eye, sub: '3-Member Expert Panel' },
          { name: 'Deficiency / Closure', icon: Award, sub: 'Compliance Report' }
        ];
      case 'Scrutiny + EVC':
      default:
        return [
          { name: '1. Intake & Dossier', icon: FileText, sub: '6 Documents Uploaded' },
          { name: '2. 6-Agent AI Verification', icon: Cpu, sub: 'Parallel OCR & NLP' },
          { name: '3. Rules & Priority Scoring', icon: isFixed ? CheckCircle : AlertTriangle, sub: isFixed ? 'Score 98/100 (Pass)' : 'Deficiency Gate Flagged' },
          { name: '4. Scrutiny Committee', icon: Users, sub: isFixed ? 'Ready for Review' : 'Awaiting Cure' },
          { name: '5. EVC Inspection', icon: Eye, sub: '3-Member Expert Visit' },
          { name: '6. Final Approval (LoA)', icon: Award, sub: 'Council Approval' }
        ];
    }
  };

  const stages = getStagesForRoute(selectedRoute);

  return (
    <div className="workflow-pipeline-card">
      <div className="pipeline-header">
        <div>
          <h2>
            <GitBranch size={20} style={{ color: 'var(--aicte-gold)' }} />
            <span>AICTE Configurable Approval Workflow Pipeline</span>
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            State Machine dynamically routes applications according to Approval Process Handbook (APH) rules.
          </p>
        </div>

        {/* Route Selector Buttons */}
        <div className="pipeline-route-selector">
          {availableRoutes.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`route-pill-btn ${selectedRoute === route.id ? 'active' : ''}`}
              title={route.desc}
              id={`route-${route.id.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Steps Track */}
      <div className="pipeline-steps-track">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          // Determine step status
          const effectiveStageIndex = isFixed ? 3 : currentStageIndex;
          const isCompleted = idx < effectiveStageIndex;
          const isActive = idx === effectiveStageIndex;
          const isWarning = isActive && !isFixed && idx === 2;

          return (
            <React.Fragment key={idx}>
              <div 
                className={`pipeline-step-node ${
                  isCompleted ? 'completed' : isActive ? (isWarning ? 'warning' : 'active') : ''
                }`}
              >
                <div className="step-node-icon">
                  <Icon size={20} />
                </div>
                <div className="step-node-title">{stage.name}</div>
                <div className="step-node-subtitle">{stage.sub}</div>
              </div>

              {idx < stages.length - 1 && (
                <div 
                  className={`pipeline-connector ${
                    idx < effectiveStageIndex ? 'filled' : ''
                  }`} 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
