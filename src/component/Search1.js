import {
  Avatar,
  Button,
  Card,
  Heading,
  Page,
  ResourceItem,
  ResourceList,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mapToDispatch, mapToState } from "../Actions/Maps";
import { useFetch } from "./FetchHook";
const Search1 = (props) => {
  const nav = useNavigate();
  const [inp, setInp] = useState();
  const [api] = useFetch("https://api.github.com/users");
  const [loading, setLoading] = useState(false);
  async function saveInput() {
    setLoading(true);
    const ft = await api._get();
    const all = ft.filter((item) => item.login.includes(inp));
    // console.log(all)
    let dt = [];
    for (let i = 0; i < all.length; i++) {
      const f = await api._get([all[i].login]);
      // console.log(f)
      dt = [...dt, f];
    }
    console.log(dt);

    props.printProfile(dt);
    setLoading(false);
  }
  // console.log(props);
  const inpHandler = (e) => {
    setInp(e);
  };
  useEffect(() => {
    if (inp) var time = setTimeout(saveInput, 1000);
    return () => {
      clearInterval(time);
    };
  }, [inp]);
  return (
    <Page title="Github">
      <Card sectioned>
        <Heading>Get Github Profile Cards!</Heading>
        <TextField placeholder="search" value={inp} onChange={inpHandler} />
      </Card>
      {props.userProfile.map((item1, i) => (
        <Card sectioned key={i}>
          <ResourceList
            resourceName={{ singular: "customer", plural: "customers" }}
            items={[
              {
                id: 145,

                avatarSource: `${item1.avatar_url}`,
                name: `${item1.login}`,
              },
            ]}
            renderItem={(item) => {
              const { id, url, avatarSource, name } = item;
              return (
                <ResourceItem
                  verticalAlignment="center"
                  id={id}
                  url={url}
                  media={
                    <Avatar
                      customer
                      size="large"
                      name={name}
                      source={avatarSource}
                    />
                  }
                  accessibilityLabel={`View details for ${name}`}
                  name={name}
                >
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <TextStyle variation="strong">{name}</TextStyle>
                    <Button
                      onClick={() => {
                        props.setUser(item1.login);
                        sessionStorage.setItem('name',item1.login)
                        nav("/user");
                      }}
                    >
                      See Profile
                    </Button>
                  </h3>
                  <div className="threecols">
                    <p>{item1.followers} Followers</p>
                    <p>{item1.following} Following</p>
                    <p>{item1.public_repos} Repos</p>
                  </div>
                </ResourceItem>
              );
            }}
          />
        </Card>
      ))}
      {props.userProfile.length === 0 && inp && !loading && (
        <Heading>No users found</Heading>
      )}
    </Page>
  );
};

export default connect(mapToState, mapToDispatch)(Search1);
