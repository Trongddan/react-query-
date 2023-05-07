import * as React from "react";
import { Flex, Box } from "@chakra-ui/react";
import {Outlet} from 'react-router-dom'
import SideBar from "../../components/sideBar";
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <Flex flexDirection='row'>
      <SideBar />
      <Outlet/>
    </Flex>
  );
}
