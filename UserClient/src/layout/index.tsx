import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC, type ReactNode } from "react";

interface props {
  children?: ReactNode;
}
export const MainLayout: FC<props> = ({ children }) => {
  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",

    width: "100%",

    position: "relative",
    paddingBlock: "30px",
    paddingInline: "40px",
    backgroundColor: "#135D66",
  };
  const layoutStyle = {
    borderRadius: 8,

    minHeight: "97vh",
    // overflow: "hidden",
    // width: "calc(50% - 8px)",
    // maxWidth: "calc(50% - 8px)",
  };
  return (
    <Layout style={layoutStyle}>
      {/* <Header style={headerStyle}>Header</Header> */}
      <Content style={contentStyle}>{children}</Content>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  );
};
