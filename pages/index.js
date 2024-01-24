import Layout from "@/components/layout/Layout";
import HomeHeader from "@/components/common/HomeHeader";
import HomeStatsNew from "@/components/common/HomeStats";

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <HomeStatsNew />
    </Layout>
  );
}
