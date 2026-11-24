import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Asterisk,
  Menu,
  X,
  Copy,
  Check,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { defineControls } from "tempo-sdk/assets";
import "./portfolio.css";

const projects = [
  {
    id: "morrow",
    name: "Morrow",
    subtitle: "让日常，回归自然",
    category: "品牌设计",
    discipline: "品牌策略 / 视觉识别 / 包装设计",
    year: "2025",
    description:
      "为一个关注自然与日常的生活方式品牌，构建安静而有生命力的视觉语言。以植物的生长为灵感，将自然的肌理、柔和的色调与克制的排版融入每一个品牌触点。",
    color: "自然绿 · 暖沙色",
    role: "品牌策略、艺术指导与视觉设计",
  },
  {
    id: "onda",
    name: "Onda",
    subtitle: "与每一种灵感，同频",
    category: "数字体验",
    discipline: "产品策略 / 网页设计 / 数字体验",
    year: "2025",
    description:
      "为新一代创作者打造开放的声音平台。用自由流动的图形和大胆的蓝色，打破内容与人的边界。从信息架构到细节交互，让每一次发现都自然发生。",
    color: "电光蓝 · 奶油白",
    role: "体验策略、UI/UX 与交互设计",
  },
  {
    id: "form",
    name: "FORM & FIELD",
    subtitle: "空间之中，自有秩序",
    category: "品牌设计",
    discipline: "艺术指导 / 视觉识别 / 编辑设计",
    year: "2024",
    description:
      "为独立建筑事务所设计一套可以呼吸的视觉系统。将建筑的留白与结构转译为版式，让空间、光影和材料成为叙事的主角。",
    color: "石灰白 · 炭黑",
    role: "艺术指导、品牌与编辑设计",
  },
  {
    id: "mono",
    name: "mono.",
    subtitle: "少一点，刚刚好",
    category: "编辑设计",
    discipline: "编辑设计 / 印刷工艺 / 艺术指导",
    year: "2024",
    description:
      "一本关于慢生活与独立创作的季刊。通过纸张的触感、文字的节奏与摄影的温度，让阅读重新成为一件值得留出时间的事。",
    color: "陶土橙 · 纸白",
    role: "概念策划、书籍设计与艺术指导",
  },
];

function ProjectArt({ id }: { id: string }) {
  if (id === "morrow")
    return (
      <div className="project-art art-morrow">
        <img src="/portfolio/interior.jpg" alt="自然光下的暖色室内空间与植物" />
        <div className="art-shade" />
        <span className="art-topline">A SLOWER WAY OF LIVING</span>
        <div className="morrow-word">
          morrow<span>®</span>
        </div>
        <span className="art-bottomline">
          Considered objects. Everyday rituals.
        </span>
        <span className="art-corner">自然生长，日常有光。</span>
      </div>
    );
  if (id === "onda")
    return (
      <div className="project-art art-onda">
        <span className="art-topline">A NEW WAVE OF CREATIVITY.</span>
        <div className="onda-orbit orbit-one" />
        <div className="onda-orbit orbit-two" />
        <div className="onda-orbit orbit-three" />
        <div className="onda-word">
          onda<span>↗</span>
        </div>
        <div className="onda-caption">
          <span>
            Ideas move.
            <br />
            So do we.
          </span>
          <span>
            Independent minds.
            <br />
            Infinite possibilities.
          </span>
        </div>
        <span className="onda-sticker">
          PLAY
          <br />
          YOUR
          <br />
          <i>WAY.</i>
        </span>
      </div>
    );
  if (id === "form")
    return (
      <div className="project-art art-form">
        <img
          src="/portfolio/architecture.jpg"
          alt="几何结构与光影交织的建筑"
          loading="lazy"
        />
        <div className="form-title">
          FORM
          <br />
          <span>& FIELD</span>
        </div>
        <span className="art-bottomline">Architecture, in good company.</span>
      </div>
    );
  return (
    <div className="project-art art-mono">
      <div className="mono-book">
        <span className="mono-issue">
          THE ART OF PAYING ATTENTION · VOL. 04
        </span>
        <strong>mono.</strong>
        <div className="mono-circle" />
        <span className="mono-book-footer">
          Less, but meaningful.
          <br />
          慢一点，感受多一点。
        </span>
      </div>
      <span className="mono-side">A JOURNAL FOR THE EVERYDAY.</span>
    </div>
  );
}
defineControls(ProjectArt, {
  id: { type: "select", options: ["morrow", "onda", "form", "mono"] },
});

export function PortfolioPage() {
  const [filter, setFilter] = useState("全部作品");
  const [selected, setSelected] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const active = projects.find((p) => p.id === selected);
  const visible = projects.filter(
    (p) => filter === "全部作品" || p.category === filter,
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("hello@linxu.design");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:hello@linxu.design";
    }
  }
  return (
    <div className="portfolio">
      <header className="portfolio-nav wrap">
        <a className="designer-logo" href="#home" aria-label="林序，返回首页">
          lin<span className="logo-star">✳</span>
          <span className="logo-name">
            林序
            <br />
            <small>Independent designer</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          <a href="#work" className="current">
            精选作品 <span>04</span>
          </a>
          <a href="#about">关于我</a>
          <a href="#contact">
            聊聊合作 <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="nav-location">
          <span className="status-dot" /> 中国 · 杭州{" "}
          <span className="nav-time">UTC +8</span>
        </div>
        <button
          className="mobile-toggle"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="移动导航">
            {[
              ["#work", "精选作品"],
              ["#about", "关于我"],
              ["#contact", "聊聊合作"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main>
        <section className="hero wrap" id="home">
          <div className="hero-eyebrow">
            <span className="tiny-cross">+</span> 独立设计师 · 品牌与数字体验{" "}
            <span className="edition">PORTFOLIO — 2024 / 2025</span>
          </div>
          <div className="hero-layout">
            <h1>
              Thoughtful design.
              <br />
              Lasting <em>feeling.</em>
              <span className="hero-spark">
                <Asterisk strokeWidth={1.2} />
              </span>
            </h1>
            <div className="hero-aside">
              <div className="hero-aside-line" />
              <p>
                你好，我是林序。
                <br />
                在理性与感性之间，
                <br />
                为品牌寻找独特而持久的表达。
              </p>
              <a href="#about">
                多了解我一点 <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <p>以细节为起点，让好的设计被感知。</p>
            <a className="availability" href="#contact">
              <span className="status-dot" /> 开放新的合作机会{" "}
              <ArrowUpRight size={14} />
            </a>
            <a className="scroll-link" href="#work">
              向下探索 <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <section className="work wrap" id="work">
          <div className="section-heading">
            <div className="section-title">
              <span className="section-index">01 /</span>
              <h2>
                精选作品 <span>Selected work</span>
              </h2>
            </div>
            <span className="work-period">2024 — 2025</span>
          </div>
          <div className="work-toolbar">
            <p>一些思考，一些探索，一些恰到好处的设计。</p>
            <div className="filters" aria-label="作品分类">
              {["全部作品", "品牌设计", "数字体验", "编辑设计"].map((label) => (
                <button
                  key={label}
                  data-active={filter === label}
                  aria-pressed={filter === label}
                  onClick={() => setFilter(label)}
                >
                  {label}
                  {label === "全部作品" && <sup>04</sup>}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visible.map((p) => (
              <button
                className="project-card"
                key={p.id}
                onClick={() => setSelected(p.id)}
                aria-label={`查看 ${p.name} 项目详情`}
              >
                <div className="project-cover">
                  <ProjectArt id={p.id} />
                  <span className="view-project">
                    探索项目 <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="project-meta">
                  <div>
                    <h3>
                      {p.name}
                      <span> — {p.subtitle}</span>
                    </h3>
                    <p>{p.discipline}</p>
                  </div>
                  <span className="project-year">
                    {p.year}
                    <ArrowUpRight size={21} strokeWidth={1.3} />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="work-note">
            <span>每一个项目，都是一次认真对话的结果。</span>
            <span>
              MORE GOOD THINGS IN THE MAKING <Asterisk size={14} />
            </span>
          </div>
        </section>
        <section className="about-section" id="about">
          <div className="about wrap">
            <div className="about-label">
              <span className="section-index">02 /</span>
              <h2>
                设计之外，
                <br />
                也是生活之中。
              </h2>
              <span className="about-english">A little about me.</span>
            </div>
            <div className="about-content">
              <p className="about-lead">
                我相信，有温度的设计，
                <br />
                来自对世界的认真观察。
              </p>
              <p>
                我是林序，一名立足杭州的独立设计师。专注于品牌视觉与数字体验，与有想法的人一起，将模糊的灵感变成清晰、有感染力的表达。
              </p>
              <p>
                喜欢旧书店、自然光和没有目的的散步。也喜欢在策略与直觉之间，找到那个「刚刚好」的答案。
              </p>
              <div className="expertise">
                <span>品牌策略与识别</span>
                <span>数字产品与网站</span>
                <span>艺术指导与编辑</span>
              </div>
            </div>
            <div className="about-mark" aria-hidden="true">
              <Asterisk strokeWidth={0.8} />
              <span>
                STAY CURIOUS.
                <br />
                MAKE IT MATTER.
              </span>
            </div>
          </div>
        </section>
        <section className="contact wrap" id="contact">
          <div className="contact-top">
            <span className="section-index">03 / LET’S TALK</span>
            <span className="availability">
              <span className="status-dot" /> 好的合作，从一句你好开始
            </span>
          </div>
          <div className="contact-main">
            <h2>
              Have something
              <br />
              <em>in mind?</em>
            </h2>
            <a
              className="contact-arrow"
              href="mailto:hello@linxu.design"
              aria-label="发送合作邮件"
            >
              <ArrowUpRight strokeWidth={1} />
            </a>
          </div>
          <div className="contact-bottom">
            <p>
              无论是新品牌、一个想法，还是简单打个招呼。
              <br />
              我都很期待听听你的故事。
            </p>
            <button className="email-button" onClick={copyEmail}>
              {copied ? "邮箱已复制" : "hello@linxu.design"}{" "}
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
        </section>
      </main>
      <footer className="portfolio-footer wrap">
        <a className="footer-wordmark" href="#home">
          lin<span>✳</span>
        </a>
        <span>© 2025 林序 · 用心设计，保持好奇。</span>
        <a href="#home">
          回到顶部 <ArrowUpRight size={14} />
        </a>
      </footer>
      <Dialog.Root
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="portfolio-dialog-overlay" />
          <Dialog.Content
            className="portfolio-dialog"
            aria-describedby="project-description"
          >
            <Dialog.Close className="dialog-close" aria-label="关闭项目详情">
              <X size={23} />
            </Dialog.Close>
            {active && (
              <>
                <ProjectArt id={active.id} />
                <div className="dialog-body">
                  <span className="section-index">
                    SELECTED PROJECT / {active.year}
                  </span>
                  <Dialog.Title>
                    {active.name}
                    <span>{active.subtitle}</span>
                  </Dialog.Title>
                  <Dialog.Description id="project-description">
                    {active.description}
                  </Dialog.Description>
                  <dl>
                    <div>
                      <dt>设计领域</dt>
                      <dd>{active.discipline}</dd>
                    </div>
                    <div>
                      <dt>我的角色</dt>
                      <dd>{active.role}</dd>
                    </div>
                    <div>
                      <dt>色彩语言</dt>
                      <dd>{active.color}</dd>
                    </div>
                  </dl>
                  <div className="project-detail-footer">
                    <span>概念作品 · 设计探索</span>
                    <button
                      onClick={() =>
                        setSelected(
                          projects[
                            (projects.findIndex((p) => p.id === active.id) +
                              1) %
                              projects.length
                          ].id,
                        )
                      }
                    >
                      下一个项目 <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
