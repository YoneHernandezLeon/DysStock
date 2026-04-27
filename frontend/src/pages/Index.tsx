import { Image } from 'primereact/image'
import logo from "../assets/dysteca.jpg"

function Index() {
  return (
    <Image src={logo} className="flex mt-8 w-6 mx-auto justify-content-center"/>
  );
}

export default Index;
