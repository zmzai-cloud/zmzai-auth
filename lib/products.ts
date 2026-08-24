/**
 * zmzai.cloud 产品矩阵 — z·m·z·a·i 逐字母体系。
 * 与 zmzai-cloud/lib/projects.ts 同源（本仓只保留落地页展示所需字段）。
 * 五个字母是「牧之 muzhi」拼音的拆解：每个字母挂一条 AI 产品线，
 * 既是产品索引，又是署名。
 */

export type ProductStatus = "live" | "building" | "planned";

export interface ProductLine {
  /** Stable identifier; letters are presentation-only and may repeat. */
  id: string;
  /** 字母标识：z · m · z · a · i，或本体 muzhi */
  letter: string;
  /** 中文产品名（单字，印章用） */
  hanzi: string;
  /** 产品线名 */
  name: string;
  /** 一句话 */
  tagline: string;
  status: ProductStatus;
  href: string;
}

/** muzhi 本体：博客 + 付费知识体系，第一个落地成员。 */
export const rootProduct: ProductLine = {
  id: "muzhi",
  letter: "M",
  hanzi: "牧之",
  name: "Muzhi",
  tagline: "自托管的知识产品交付与会员运营底座",
  status: "live",
  href: "https://muzhi.zmzai.cloud",
};

/** z·m·z·a·i 五条字母产品线。 */
export const letterProducts: ProductLine[] = [
  {
    id: "sandbox",
    letter: "Z",
    hanzi: "沙箱",
    name: "Sandbox",
    tagline: "受限代码执行与 Agent 实验环境",
    status: "building",
    href: "https://z.zmzai.cloud",
  },
  {
    id: "relay",
    letter: "M",
    hanzi: "模型",
    name: "Relay",
    tagline: "模型与 API 的中转站",
    status: "live",
    href: "https://m.zmzai.cloud",
  },
  {
    id: "hub",
    letter: "H",
    hanzi: "枢纽",
    name: "Hub",
    tagline: "zmzai.cloud 主站与产品索引",
    status: "live",
    href: "https://zmzai.cloud",
  },
  {
    id: "agent",
    letter: "A",
    hanzi: "Agent",
    name: "Agent",
    tagline: "从对话开始完成真实任务",
    status: "live",
    href: "https://a.zmzai.cloud",
  },
  {
    id: "workos",
    letter: "I",
    hanzi: "工作台",
    name: "WorkOS",
    tagline: "AI 时代的个人工作台",
    status: "planned",
    href: "https://i.zmzai.cloud",
  },
];

export const allProducts: ProductLine[] = [rootProduct, ...letterProducts];

export function statusLabel(status: ProductStatus): string {
  switch (status) {
    case "live":
      return "LIVE";
    case "building":
      return "BUILDING";
    case "planned":
      return "PLANNED";
  }
}
