import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";

const Home = () => {
  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default Home;
