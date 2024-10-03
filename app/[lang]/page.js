import { getDictionary } from "@/get-dictionary";
import Comments from "./components/Comments";
import Header from "./components/Header";
import { Layout } from "antd/es";

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);

  const navLinks = [
    { href: "/category", label: dict.category },
    { href: "/user", label: dict.user },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header 
        title={dict.appTitle} 
        loginText={dict.login} 
        navLinks={navLinks} 
      />
      <h1 className="text-2xl">{dict.welcome}</h1>
      {/* <Comments/> */}
    </Layout>
  );
}