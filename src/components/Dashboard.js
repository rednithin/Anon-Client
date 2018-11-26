import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Card, Elevation, H4, Icon, Tag, UL } from "@blueprintjs/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { SuccessToaster } from "./Toaster";

const Dashboard = props =>
  props.store.company ? (
    <Card elevation={Elevation.ONE} style={{ width: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <H4>Company Details</H4>
        <Icon icon="refresh" onClick={props.store.refresh} />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Name</div>
          <div>{props.store.company.name}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Email</div>
          <div>{props.store.company.email}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Description</div>
          <div>{props.store.company.description}</div>
        </div>
      </div>
      {props.store.company.questions.length !== 0 && (
        <div>
          <br />
          <H4>Questions</H4>
          <UL style={{ margin: "0px", padding: "0px" }}>
            {props.store.company.questions.map(({ id, query, isPublic }) => (
              <li
                style={{
                  listStyle: "none",
                  margin: "5px 0px",
                  padding: "0px"
                }}
                key={id}
              >
                <div style={{ display: "flex" }}>
                  <Link to={`/question/${id}`} style={{ margin: "5px" }}>
                    <Icon icon="import" />
                  </Link>
                  <CopyToClipboard
                    text={`http://localhost:3000/respond/${id}`}
                    onCopy={() => SuccessToaster("Copied to Clipboard")}
                    style={{ margin: "5px" }}
                  >
                    <Icon icon="link" intent="primary" />
                  </CopyToClipboard>
                  {isPublic ? (
                    <Tag intent="primary">Public</Tag>
                  ) : (
                    <Tag minimal>Private</Tag>
                  )}

                  <div style={{ margin: "5px" }}>{query}</div>
                </div>
              </li>
            ))}
          </UL>
        </div>
      )}
    </Card>
  ) : (
    <Card>
      Welcome to Anon, the best anonymous feedback site. Login or register to
      continue.
    </Card>
  );

export default inject("store")(observer(Dashboard));
