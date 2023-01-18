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
import React, { FC, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mapToDispatch, mapToState } from "../Actions/Maps";
import Errorboundary from "../errorBoundary/Errorboundary";
import { useFetch } from "./FetchHook";
type sProps = ReturnType<typeof mapToDispatch> & ReturnType<typeof mapToState>;
const Search1: FC<sProps> = (props) => {
  console.log(props)
  const [apiError,setApiError] = useState<string>("")
  let ref:any = useRef();
  const nav = useNavigate();
  const [inp, setInp] = useState();
  const [api] = useFetch("https://api.github.com/users");
  const [loading, setLoading] = useState(false);
  if(apiError){
    throw new Error(apiError);
  }
  async function saveInput(e: string) {
    setLoading(true);
    const ft = await api._get();
    if(!Array.isArray(ft)){
      setApiError(ft.message)
      return
    }else setApiError("")
    const all: any = ft.filter((item: any) => item.login.includes(e));
    let dt: any = [];
    for (let i = 0; i < all.length; i++) {
      const data = await api._get([all[i].login]);
      dt = [...dt, data];
    }
    console.log(dt);

    props.printProfile(dt);
    setLoading(false);
  }
  const inpHandler = (e: any) => {
    setInp(e);
    if (e) {
      clearTimeout(ref.current);
      ref.current = setTimeout(()=>saveInput(e), 1000);
    }
  };
  return (
    <Page title="Github">
      <Card sectioned>
        <Heading>Get Github Profile Cards!</Heading>
        <TextField
          placeholder="search"
          value={inp}
          onChange={inpHandler}
          autoComplete="off"
          label=""
        />
      </Card>
      { props && props.userProfile?.map((item1: any, i: number) => (
        <Card sectioned key={i}>
          <ResourceList
            resourceName={{ singular: "customer", plural: "customers" }}
            items={[
              {
                id: "145",
                avatarSource: `${item1.avatar_url}`,
                name: `${item1.login}`,
              },
            ]}
            renderItem={(item) => {
              const { id, avatarSource, name } = item;
              return (
                <ResourceItem
                  verticalAlignment="center"
                  id={id}
                  url={""}
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
                        sessionStorage.setItem("name", item1.login);
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

export const errorBoundary =(Comp:any|React.FC|JSX.Element)=>{
  const Wrapper = (props: Object):JSX.Element=>{
    return (
    <Errorboundary>
      <Comp {...props}/>
    </Errorboundary>
    )
  }
  return connect(mapToState,mapToDispatch)(Wrapper)
}

export default (errorBoundary)(Search1);
// export default connect(mapToState,mapToDispatch)(Search1)
