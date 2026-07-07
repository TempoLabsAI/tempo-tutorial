import type { TempoCanvasConfig, TempoStoryboard } from 'tempo-sdk';
import CoverBoard from './CoverBoard';
import HomePageGroupBoard from './HomePageGroupBoard';
import SearchPageGroupBoard from './SearchPageGroupBoard';
import ListingDetailPageGroupBoard from './ListingDetailPageGroupBoard';
import TripsPageGroupBoard from './TripsPageGroupBoard';
import MessagesPageGroupBoard from './MessagesPageGroupBoard';
import WishlistsPageGroupBoard from './WishlistsPageGroupBoard';

const config: TempoCanvasConfig = {
  name: "01 · Template",
};

export default config;

export const Cover: TempoStoryboard = {
  render: () => <CoverBoard />,
  name: "00 · Cover",
  layout: { x: -169, y: 0, width: 1406, height: 351, intrinsicSizing: "root-element" },
};

export const HomePageGroup: TempoStoryboard = {
  render: () => <HomePageGroupBoard />,
  name: "02 · HomePage",
  layout: { x: 1330, y: 0, width: 1168, height: 1743, intrinsicSizing: "root-element" },
};

export const SearchPageGroup: TempoStoryboard = {
  render: () => <SearchPageGroupBoard />,
  name: "03 · SearchPage",
  layout: { x: 2548, y: 0, width: 1168, height: 2239, intrinsicSizing: "root-element" },
};

export const ListingDetailPageGroup: TempoStoryboard = {
  render: () => <ListingDetailPageGroupBoard />,
  name: "04 · ListingDetailPage",
  layout: { x: 3766, y: 0, width: 1168, height: 1743, intrinsicSizing: "root-element" },
};

export const TripsPageGroup: TempoStoryboard = {
  render: () => <TripsPageGroupBoard />,
  name: "05 · TripsPage",
  layout: { x: 4984, y: 0, width: 1168, height: 1247, intrinsicSizing: "root-element" },
};

export const MessagesPageGroup: TempoStoryboard = {
  render: () => <MessagesPageGroupBoard />,
  name: "06 · MessagesPage",
  layout: { x: 6202, y: 0, width: 1168, height: 1247, intrinsicSizing: "root-element" },
};

export const WishlistsPageGroup: TempoStoryboard = {
  render: () => <WishlistsPageGroupBoard />,
  name: "07 · WishlistsPage",
  layout: { x: 7420, y: 0, width: 1168, height: 1743, intrinsicSizing: "root-element" },
};
