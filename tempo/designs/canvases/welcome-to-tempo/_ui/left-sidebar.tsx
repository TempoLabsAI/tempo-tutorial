/**
 * Display replica of tempo-client's workspace `LeftSidebar`
 * (src/workspaces/components/LeftSidebar.tsx): the "Chats" header, one
 * project with an expanded workspace whose first chat is promoted onto the
 * workspace row and the rest nested under it, and the footer action. The
 * tutorial shows it as a picture of the app's sidebar; drag-and-drop,
 * selection and menus are not wired.
 */
import type { CSSProperties, ReactNode } from "react";
import { ChevronDown } from "./icons";

export interface SidebarProject {
  id: string;
  name: string;
  workspaces: {
    id: string;
    name: string;
    mode: "worktree" | "local";
    chats: { id: string; label: string }[];
  }[];
}

const TREE_ITEM =
  "relative group flex w-full min-w-0 select-none items-center overflow-hidden rounded-md gap-[var(--tree-item-gap)] text-[length:var(--tree-label-size)] leading-[var(--tree-label-line-height)] outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-border-secondary";

function treeItemStyle(level: number): CSSProperties {
  return {
    paddingLeft: `calc(var(--tree-item-px) + calc(${level} * var(--tree-item-indent)))`,
    paddingRight: "var(--tree-item-pr, var(--tree-item-px))",
    paddingTop: "var(--tree-item-py)",
    paddingBottom: "var(--tree-item-py)",
    height: "var(--tree-item-height, auto)",
    transition: "background-color 150ms, color 150ms",
  };
}

/** hugeicons `Folder01Icon` with the chat-count badge. */
function WorkspaceFolderIcon({ count }: { count: number }) {
  return (
    <div
      className="relative flex size-[var(--tree-icon-size)] items-center justify-center"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color="currentColor"
        className="size-[var(--tree-icon-size)] text-icons-tertiary"
      >
        <path
          d="M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute bottom-0 -right-[3px] flex min-w-[10px] items-center justify-center rounded-full bg-surface-container-lowest px-[2px] text-[7px] font-semibold leading-[10px] text-icons-tertiary">
        {count}
      </div>
    </div>
  );
}

function TreeLabel({ children }: { children: ReactNode }) {
  return (
    <span className="min-w-0 flex-1 overflow-hidden">
      <span className="block truncate outline-none text-body font-normal text-text-primary">
        {children}
      </span>
    </span>
  );
}

export function LeftSidebar({
  privateProjects,
  expandedWorkspaceIds = [],
  selectedWorkspaceId,
  footerAction,
}: {
  privateProjects: SidebarProject[];
  expandedWorkspaceIds?: string[];
  selectedWorkspaceId?: string;
  activeChatTabId?: string;
  onWorkspaceToggle?: () => void;
  onWorkspaceReorder?: () => void;
  onProjectReorder?: () => void;
  onChatReorder?: () => void;
  footerAction?: ReactNode;
}) {
  return (
    <aside
      className="flex h-full min-h-0 w-full flex-col border-r-[0.5px] border-border-secondary bg-surface-sidebar-base relative min-w-0 overflow-hidden"
      style={{ maxWidth: "none" }}
    >
      <div className="shrink-0">
        <div className="flex h-11 items-center justify-between px-3">
          <span className="select-none truncate text-[13px] font-semibold leading-5 text-text-secondary">
            Chats
          </span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col border-t-[0.5px] border-border-secondary">
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden [overflow-anchor:none]">
          <div className="grid grid-cols-1 min-w-0 content-start gap-0 overflow-x-clip">
            {privateProjects.map((project) => (
              <div key={project.id} style={{ position: "relative" }}>
                <section className="flex flex-col pt-2">
                  <div className="flex flex-col gap-1 px-2 pb-[13px] overflow-x-clip">
                    <div className="contents">
                      <section
                        aria-label={`${project.name} workspace tree`}
                        className="rounded-2xl bg-surface-container-lowest p-2 w-full !rounded-none !bg-transparent last:!pb-0 [--tree-item-indent-override:0px] [--tree-item-pr:4px] [--tree-item-hover-bg:var(--surface-sidebar-item-hover)] [--tree-selection-bg:var(--surface-sidebar-item-hover)] [--tree-group-gap-override:4px] [--tree-item-actions-bg:transparent] [&_[role=treeitem]]:rounded-[4px] space-y-1 !p-0"
                        style={
                          {
                            "--tree-item-py": "var(--tree-item-py-comfortable)",
                          } as CSSProperties
                        }
                      >
                        <div className="contents">
                          <div
                            className="group/project-header relative flex cursor-pointer items-center gap-2 px-[var(--tree-item-px)] py-[var(--tree-item-py)] rounded-sm hover:bg-surface-container"
                            style={{
                              transition: "background-color 150ms, color 150ms",
                            }}
                          >
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="min-w-0 flex items-center cursor-grab active:cursor-grabbing touch-none">
                                <span className="block truncate outline-none text-[length:var(--tree-label-size)] font-semibold leading-tight text-text-secondary">
                                  {project.name}
                                </span>
                              </div>
                            </div>
                            <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-1" />
                          </div>
                        </div>
                        <div>
                          <div
                            role="tree"
                            aria-label={`${project.name} workspace tree`}
                            className="w-full [--tree-item-indent:var(--tree-item-indent-override,16px)]"
                            style={
                              {
                                "--tree-item-py": "5px",
                                "--tree-item-gap-y":
                                  "var(--tree-item-gap-y-override, 4px)",
                                "--tree-group-gap":
                                  "var(--tree-group-gap-override, 8px)",
                                "--tree-children-gap":
                                  "var(--tree-children-gap-override, 4px)",
                              } as CSSProperties
                            }
                          >
                            {project.workspaces.map((workspace) => {
                              const [promoted, ...rest] = workspace.chats;
                              const selected =
                                workspace.id === selectedWorkspaceId;
                              const expanded = expandedWorkspaceIds.includes(
                                workspace.id,
                              );
                              return (
                                <div
                                  key={workspace.id}
                                  style={{ position: "relative" }}
                                >
                                  <div
                                    className="overflow-hidden rounded-[4px] border-[0.5px] border-transparent hover:border-border-secondary hover:bg-surface-container [&:hover_[role=treeitem]]:rounded-none"
                                    style={
                                      {
                                        "--tree-item-gap-y": "0px",
                                        "--tree-children-gap": "0px",
                                      } as CSSProperties
                                    }
                                  >
                                    <div role="none" className="relative">
                                      <div
                                        role="treeitem"
                                        tabIndex={0}
                                        aria-expanded={expanded}
                                        aria-selected={selected}
                                        className={`${TREE_ITEM} ${selected ? "bg-[var(--tree-selection-bg,var(--surface-container))] text-text-primary" : "text-text-secondary"} cursor-pointer`}
                                        style={treeItemStyle(0)}
                                      >
                                        <span className="relative size-[var(--tree-icon-size)] shrink-0">
                                          <span className="leading-none group-hover:opacity-0">
                                            <WorkspaceFolderIcon
                                              count={workspace.chats.length}
                                            />
                                          </span>
                                          <button
                                            type="button"
                                            tabIndex={-1}
                                            aria-label="Collapse folder"
                                            className="absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 group-hover:opacity-100 rounded-sm text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:text-text-primary"
                                          >
                                            <ChevronDown className="size-[var(--tree-chevron-size)]" />
                                          </button>
                                        </span>
                                        <TreeLabel>{promoted?.label}</TreeLabel>
                                      </div>
                                      {expanded && (
                                        <div
                                          role="group"
                                          className="grid"
                                          style={
                                            {
                                              gridTemplateRows: "1fr",
                                              "--tree-item-height": "28px",
                                            } as CSSProperties
                                          }
                                        >
                                          <div
                                            className="min-h-0 overflow-hidden relative"
                                            style={{
                                              marginTop:
                                                "var(--tree-children-gap)",
                                            }}
                                          >
                                            <div
                                              aria-hidden="true"
                                              className="absolute bg-border-secondary"
                                              style={{
                                                left: "14.5px",
                                                width: "0.5px",
                                                top: "0px",
                                                bottom: "0px",
                                              }}
                                            />
                                            <div>
                                              {rest.map((chat) => (
                                                <div
                                                  key={chat.id}
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  <div
                                                    role="none"
                                                    className="relative"
                                                  >
                                                    <div
                                                      role="treeitem"
                                                      tabIndex={-1}
                                                      className={`${TREE_ITEM} text-text-secondary hover:bg-[var(--tree-item-hover-bg)] hover:text-text-primary data-[hovered=true]:bg-[var(--tree-item-hover-bg)] data-[hovered=true]:text-text-primary cursor-pointer`}
                                                      style={treeItemStyle(1)}
                                                    >
                                                      <span className="relative size-[var(--tree-icon-size)] shrink-0">
                                                        <span className="leading-none">
                                                          <div className="flex size-[var(--tree-icon-size)] items-center justify-center leading-none">
                                                            <span className="shrink-0 rounded-full bg-[color:var(--info)] size-1.5 opacity-0" />
                                                          </div>
                                                        </span>
                                                      </span>
                                                      <TreeLabel>
                                                        {chat.label}
                                                      </TreeLabel>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2 pb-2" />
        {footerAction && (
          <div
            className="border-t border-border-secondary p-2"
            style={{ borderTopWidth: "var(--border-width-thin)" }}
          >
            {footerAction}
          </div>
        )}
      </div>
    </aside>
  );
}
