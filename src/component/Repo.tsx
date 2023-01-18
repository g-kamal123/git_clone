import { Button, Layout, Page } from "@shopify/polaris";
import React, { FC, useEffect, useState } from "react";
import { StarOutlineMinor } from "@shopify/polaris-icons";
import { useFetch } from "./FetchHook";
import { mapToDispatch, mapToState } from "../Actions/Maps";
import { connect } from "react-redux";
type rProps =ReturnType<typeof mapToDispatch> & ReturnType<typeof mapToState>;
const Repo:FC<rProps> = (props)=> {
  const [api] = useFetch("https://api.github.com/users");
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const ftch = await api._get([props.user, "repos"]);
      setRepos(ftch);
      // console.log(ftch);
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(props);
  return (
    <Page fullWidth>
      <Layout>
        {repos.map((item:any, i) => (
          <Layout.Section key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize:'1.4rem',
                zIndex:'-99'
              }}
            >
              <span  style={{
                cursor:'pointer',
                color:'blue',
                textDecoration:'underline'
              }} onClick={()=>window.open(item.html_url,'_blank')}>
                {item.name}
              </span>
              <Button icon={StarOutlineMinor}>star</Button>
            </div>
            <hr />
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}
export default connect(mapToState)(Repo);
