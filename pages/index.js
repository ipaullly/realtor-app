import Link from 'next/link';
import Image from "next/image";
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap={"wrap"} justifyContent="center" alignItems={"center"} m="10">
    <Image src={imageUrl} width="500" height={"350"} alt="banner" />
    <Box p={"5"}>
      <Text color={"gray.500"} fontSize="sm" fontWeight={"medium"}>
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight={"medium"}>
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop={"3"} paddingBottom={"3"} color="gray.700">
        {desc1} 
        <br />
        {desc2}
      </Text>
      <Button>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <div>
      <Banner
        purpose={"RENT A HOME"}
        title1="Rental Homes for"
        title2={"Everyone"}
        desc1="Explore Apartments, Villas, Homes"
        desc2={"and more"}
        buttonText="Explore Renting"
        linkName={"/search?purpose=for-rent"}
        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      />
      <Flex flexWrap={"wrap"}>
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose={"BUY A HOME"}
        title1="Find, Buy, & Own Your"
        title2={"Dream Home"}
        desc1="Explore Apartments, Villas, Homes"
        desc2={"and more"}
        buttonText="Explore Buying"
        linkName={"/search?purpose=for-rent"}
        imageUrl="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      />
      <Flex flexWrap={"wrap"}>
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </div>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}