/**
 * zmzai.cloud 产品矩阵 — 书写系列（Writing suite）。
 *
 * 命名定案见 BRAND.md §6.5：一页纸从写到印到装订到落款的完整过程，
 * 对应产品从执行到记录到归档的全链路。全部为真实英文出版术语，
 * 无中式印章元素——旧的 z·m·z·a·i 逐字母体系与朱文印已随之下线。
 *
 * 第一阶段只改呈现层：品牌名用书写系列，跳转仍指向既有子域；
 * 第二阶段（DNS 配 margin./plate./quill./codex./colophon.）再换 href。
 */

export type ProductStatus = "live" | "building" | "planned";

export interface ProductLine {
  /** Stable identifier; 与仓库名一致（技术标识与品牌名是两套系统）。 */
  id: string;
  /** 品牌名（书写系列，用户可见）。 */
  name: string;
  /** 中文副名，跟着品牌名走一行小字。 */
  hanzi: string;
  /** 一句话说明它在这页纸的哪个位置。 */
  tagline: string;
  status: ProductStatus;
  href: string;
}

export const allProducts: ProductLine[] = [
  {
    id: "folio",
    name: "Folio",
    hanzi: "门户",
    tagline: "对开本首页——账户、工作区与全部入口",
    status: "live",
    href: "https://zmzai.cloud",
  },
  {
    id: "quill",
    name: "Quill",
    hanzi: "执笔者",
    tagline: "Agent 工作台，从对话开始完成真实任务",
    status: "live",
    href: "https://a.zmzai.cloud",
  },
  {
    id: "margin",
    name: "Margin",
    hanzi: "页边",
    tagline: "页边通道——模型与 API 的中继",
    status: "live",
    href: "https://m.zmzai.cloud",
  },
  {
    id: "plate",
    name: "Plate",
    hanzi: "印版",
    tagline: "隔离试跑的代码沙箱，跑完即焚",
    status: "building",
    href: "https://z.zmzai.cloud",
  },
  {
    id: "codex",
    name: "Codex",
    hanzi: "古卷",
    tagline: "装订成册的记忆中心",
    status: "building",
    href: "https://k.zmzai.cloud",
  },
  {
    id: "colophon",
    name: "Colophon",
    hanzi: "版本记",
    tagline: "投研竞技场——排行与落款",
    status: "live",
    href: "https://arena.zmzai.cloud",
  },
  {
    id: "index",
    name: "Index",
    hanzi: "目录",
    tagline: "今日视图与收件箱",
    status: "planned",
    href: "https://i.zmzai.cloud",
  },
  {
    id: "muzhi",
    name: "muzhi",
    hanzi: "牧之",
    tagline: "署名站——博客与付费知识体系",
    status: "live",
    href: "https://muzhi.zmzai.cloud",
  },
];

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
