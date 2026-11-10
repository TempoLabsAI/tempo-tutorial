import * as React from "react";
import { Plus, X } from "./_ui/icons";
import { Button } from "./_ui/primitives";
import {
  ChatInputRichtext,
  type ChatInputRichtextHandle,
} from "./_ui/chat-input-richtext";
import { OnboardingFlow } from "./_ui/onboarding-flow";
import { LeftSidebar, type SidebarProject } from "./_ui/left-sidebar";

// Pieces for the last tutorial frame (6. Start a new project).

const noop = () => {};

/** A plain mouse pointer, same as the one on the Create frame. */
export function PointerCursor() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path
        d="M2 2 L2 22.5 L7.4 17.6 L11 26 L14.6 24.4 L11.1 16.3 L18.5 16.3 Z"
        fill="#FFFFFF"
        stroke="#141414"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tutorialProjects: SidebarProject[] = [
  {
    id: "tempo-tutorial",
    name: "tempo-tutorial",
    workspaces: [
      {
        id: "workspace-tutorial",
        name: "main",
        mode: "worktree",
        chats: [
          { id: "chat-tour", label: "Tempo tour" },
          { id: "chat-landing", label: "Landing page refresh" },
        ],
      },
    ],
  },
];

/**
 * Tempo's real left sidebar (`LeftSidebar`) with the demo project in it and
 * the same "Add project" footer button WorkspacesPage passes as
 * `footerAction` (classes copied from there, shown in its hover state). In
 * the app that button calls `requestGuidedProjectSetup()`, which opens the
 * "Create or open a project" modal shown next to it.
 */
export function SidebarAddProjectPreview() {
  return (
    <div className="relative h-[400px] w-[264px] overflow-hidden rounded-xl border border-border-primary bg-background p-2 text-foreground shadow-[0_24px_60px_rgba(10,10,40,0.45)] [border-width:0.5px]">
      <LeftSidebar
        privateProjects={tutorialProjects}
        expandedWorkspaceIds={["workspace-tutorial"]}
        selectedWorkspaceId="workspace-tutorial"
        activeChatTabId="chat-tour"
        onWorkspaceToggle={noop}
        onWorkspaceReorder={noop}
        onProjectReorder={noop}
        onChatReorder={noop}
        footerAction={
          <button
            type="button"
            className="flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm bg-surface-container px-1.5 py-1.5 text-body text-text-primary transition-colors"
          >
            <Plus className="size-3" />
            <span className="truncate">Add project</span>
          </button>
        }
      />
      <span className="pointer-events-none absolute bottom-[2px] left-[132px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
        <PointerCursor />
      </span>
    </div>
  );
}

/**
 * The prompt box on the "describe what you'd like to build" step: Tempo's
 * real chat composer with the onboarding placeholder, minus the app's
 * model-defaults store wiring.
 */
function ProjectPromptInput() {
  const ref = React.useRef<ChatInputRichtextHandle>(null);
  return (
    <ChatInputRichtext
      ref={ref}
      mentionItems={[]}
      mentionGroups={[]}
      provider="claude"
      model="opus-4.8"
      modelDisplayName="Opus 4.8"
      onModelChange={noop}
      modelGroups={[
        {
          label: "Claude Code",
          models: [
            { id: "opus-4.8", shortName: "Opus 4.8", provider: "claude" },
          ],
        },
      ]}
      crossProviderOpensNewChat={false}
      placeholder="Describe what you'd like to build"
      onSend={noop}
      onTextChange={noop}
      onTokensChange={noop}
      onAddFiles={noop}
    />
  );
}

/**
 * Tempo's real "Create or open a project" modal content: the production
 * `OnboardingFlow` in project-setup mode, inside the same 720×520 surface
 * `ProjectSetupFrame` gives it (classes copied from that frame). The Dialog
 * wrapper itself is left out — an open modal would trap focus and block
 * clicks on every other storyboard on the canvas.
 */
export function ProjectSetupPreview() {
  return (
    <div className="relative flex h-[520px] w-[720px] flex-col overflow-hidden rounded-xl border border-border-primary bg-surface-container shadow-dialog [border-width:0.5px]">
      <Button
        className="absolute right-4 top-4 z-10"
        variant="ghost"
        size="sm"
        aria-label="Cancel project setup"
        onClick={noop}
      >
        <X className="size-4" />
      </Button>
      <OnboardingFlow
        projectSetupOnly
        initialStep="create-project"
        presentation={{ progressLabel: "YOUR PROJECT", hideBack: true }}
        onComplete={noop}
        onOpenExistingProject={async () => null}
        renderCreatePromptInput={() => <ProjectPromptInput />}
      />
    </div>
  );
}
