import { Avatar, Button, Card, Heading, Icon, Tabs } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import {
  CustomersMajor,
  StarOutlineMinor,
  LocationMajor,
  EmailMajor,
  AttachmentMajor,
  SocialPostMajor,
  HeartMajor,
} from "@shopify/polaris-icons";
import Repo from "./Repo";
import { connect } from "react-redux";
import { mapToState } from "../Actions/Maps";
import { useFetch } from "./FetchHook";

const Userbody = (props) => {
  const [selected, setSelected] = useState(0);
  const [detail,setDetail] = useState([])
  const [api] = useFetch("https://api.github.com/users");

  useEffect(()=>{
    const getData = async () => {
      const ftch = await api._get([props.user]);
      // setRepos(ftch);
      // console.log(ftch);
      setDetail([ftch])
    };
    getData();
  },[])
console.log(detail)
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers-fitted-2",
      content: "Overview",
      accessibilityLabel: "All customers",
      panelID: "all-customers-fitted-content-2",
    },
    {
      id: "accepts-marketing-fitted-2",
      content: "Repositries",
      panelID: "accepts-marketing-fitted-Ccontent-2",
    },
    {
      id: "abc",
      content: "Projects",
      panelID: "",
    },
  ];
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
    >
      <div style={{ flex: "2 0 0" }}>
        <Card sectioned>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <p style={{ width: "14vw" }}>
              <Avatar
                size=""
                name={props.user}
                source={detail[0]?.avatar_url}
              />
            </p>
            <Heading>{props.user}</Heading>
            <p>
              Polaris is the design system for the Shopify admin. It’s the
              shared language that guides how we build high-quality merchant
              experiences.
            </p>
            <p style={{ display: "flex", alignItem: "center", gap: "2vw" }}>
              <Button>Follow</Button>
              <Button icon={HeartMajor}>Sponsor</Button>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "flex",gap:'0.2rem' }}>
                <Icon source={CustomersMajor} />
                <Heading> {detail[0]?.followers}</Heading>
                followers<Heading>.</Heading>
              </span>
              <span style={{ display: "flex" }}> 
              <Heading>{detail[0]?.following}</Heading>following<Heading>.</Heading></span>
              <span style={{ display: "flex" }}>
                <Icon source={StarOutlineMinor} />
                <Heading> {detail[0]?.public_gists}</Heading>
              </span>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                gap: "0.7rem",
              }}
            >
              <span style={{ display: "flex",gap:'0.2rem' }}>
                <Icon source={LocationMajor} />
                <span>{detail[0]?.location}</span>
              </span>
              <span style={{ display: "flex",gap:'0.2rem' }}>
                <Icon source={EmailMajor} />
                <span>{detail[0]?.email}</span>
               
              </span>
              <span style={{ display: "flex",gap:'0.2rem' }}>
                <Icon source={AttachmentMajor} />
              <span>{detail[0]?.blog}</span>
              </span>
              <span style={{ display: "flex",gap:'0.2rem' }}>
                <Icon source={SocialPostMajor} />
                <span>{detail[0]?.twitter_username}</span>
              </span>
            </p>
          </div>
        </Card>
      </div>
      <div style={{ flex: "5 0 0" }}>
        <Card>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            fitted
          >
            <Card.Section title={tabs[selected].content}>
              {selected === 0 && (
                <Card title={`I'm ${props.user}`} sectioned>
                  <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                  </p>
                </Card>
              )}
              {selected === 1 && (
                <Repo />
              )}
              {selected === 2 && (
                <Heading>{props.user}'s Projects</Heading>
              )}
            </Card.Section>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default connect(mapToState)(Userbody);
