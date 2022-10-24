import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import "../styles/footer.css";
import {
  BsFacebook,
  BsInstagram,
  BsSnapchat,
  BsWhatsapp,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="mb-4">
        <Row>
          <Col lg="12" md="12" sm="12">
            <h3 className="text-center text-white">
              Follow us on Social Media
            </h3>
            <ListGroup>
              <ListGroupItem className="follow-icons border-0 ps-0 pe-0">
                <ul className="socials text-center list-unstyled">
                  <a href="https://www.facebook.com/mikysdeliminimart/">
                    <BsFacebook className="icon facebook align-center" />
                  </a>
                  <a href="https://www.instagram.com/mikysdeli/?hl=en">
                    <BsInstagram className="icon" />
                  </a>
                  <a href="">
                    <BsSnapchat className="icon" />
                  </a>
                  <a href="https://wa.me/97455251120">
                    <BsWhatsapp className="icon" />
                  </a>
                </ul>
              </ListGroupItem>
            </ListGroup>
            <Container className="contactUs__container">
              <h4 style={{ paddingBottom: "1rem" }}>Contact Us</h4>

              <Row>
                {/* <Col sm={{ size: "auto", offset: 1 }} > */}
                  <Col lg="4" md="6" sm="6"> 
                  {" "}
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      height: 80,
                      flexGrow: 1,
                      maxWidth: 400,
                      // overflowY: "auto",
                    }}
                  >
                    <TreeItem nodeId="15" sx={{ pb: 1.5 }} label="Pearl Qatar">
                      <TreeItem nodeId="1" label="44410990" />
                      <TreeItem nodeId="2" label="55251120" />
                    </TreeItem>
                    <TreeItem
                      nodeId="3"
                      sx={{ pb: 1.5 }}
                      label="Lusail Food Arena"
                    >
                      <TreeItem nodeId="4" label="66992879" />
                    </TreeItem>
                    {/* <TreeItem
                      nodeId="11"
                      sx={{ pb: 2,pt:2, mt:2 }}
                      label="ASAS Twin Towers"
                    >
                      <TreeItem nodeId="12" label="44410993" />
                      
                    </TreeItem> */}
                  </TreeView>
                </Col>
                {/* <Col sm={{ size: "auto", offset: 1 }}> */}
                <Col lg="4" md="6" sm="6">
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      height: 80,
                      flexGrow: 1,
                      maxWidth: 400,
                      // overflowY: "auto",
                    }}
                  >
                    <TreeItem
                      nodeId="5"
                      sx={{ pb: 1.5}}
                      label="Duhail Destination Box"
                      
                    >
                      <TreeItem nodeId="6" label="33267460" />
                    </TreeItem>
                    <TreeItem
                      nodeId="7"
                      sx={{ pb: 1.5 }}
                      label="Qatar Sports Club"
                    >
                      <TreeItem nodeId="8" label="55999674" />
                    </TreeItem>
                  </TreeView>
                </Col>
                {/* <Col sm={{ size: "auto", offset: 1 }}> */}
                <Col lg="4" md="6" sm="6">
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      height: 80,
                      flexGrow: 1,
                      maxWidth: 400,
                      // overflowY: "auto",
                    }}
                  >
                    <TreeItem nodeId="5" sx={{ pb: 1.5 }} label="Royal Plaza">
                      <TreeItem nodeId="6" label="44477763" />
                      <TreeItem nodeId="13" label="33588786" />
                    </TreeItem>
                    <TreeItem nodeId="7" sx={{ pb: 1.5 }} label="Aspire Zone">
                      <TreeItem nodeId="8" label="55999674" />
                    </TreeItem>
                  </TreeView>
                  
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <div className=" text-center copyrightContainer">
        <p>© 2022 Yum! III (UK) Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
