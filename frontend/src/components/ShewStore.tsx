import React, { useContext, useEffect, useState } from "react";
import { StoreFrontContext } from "../hardhat/SymfoniContext";
import BasicTable from "./Table";
import Post from "./Post";
import logo from "../shew.svg";

interface Props {}

type ShewStruct = {
  name: string;
  price: number;
  size: number;
};

function createData(name: string, size: number, price: number) {
  return { name, size, price };
}

export const Shew: React.FC<Props> = () => {
  let shew = useContext(StoreFrontContext);
  const [shewList, setShewList] = useState<ShewStruct[]>([]);
  useEffect(() => {
    const doAsync = async () => {
      if (!shew.instance) return;
      console.log("Shew Store is deployed at ", shew.instance.address);
      const num = await shew.instance.getNumberTokens();
      var i;
      var newList: ShewStruct[] = [];
      console.log(num);
      for (i = 0; i < num.toNumber(); i++) {
        let sh = await shew.instance.getToken(i);
        const name = sh[0];
        const price = sh[1].toNumber();
        const size = sh[2].toNumber();
        const data = createData(name, price, size);
        newList = newList.concat(data);
      }
      setShewList(newList);
    };
    doAsync();
  }, []);

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <Post />
      <hr>{}</hr>
      <BasicTable rows={shewList} />
    </div>
  );
};
