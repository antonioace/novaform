import ContainerLayoutAuth from "@/components/layout/container-layout.-auth";

export default function Home() {
  return <div>Hola Mundo</div>;
}
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <ContainerLayoutAuth>{page}</ContainerLayoutAuth>;
};

