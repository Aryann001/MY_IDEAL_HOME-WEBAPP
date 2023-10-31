import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  Flex,
} from "@chakra-ui/react";


export default function HouseCard({ house }) {
  return (
    <Stack
      role={"group"}
      p={6}
      maxW={"330px"}
      width={"max-content"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Link href={`/house/${house._id}`} _hover={{ textDecoration: "none" }}>
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${house.images[0].url})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={house.images[0].url}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={"flex-start"}>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            textTransform={"uppercase"}
          >
            {house.title}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"}>
            {house.address}
          </Text>
          <Text
            fontFamily={"body"}
            height={"3.5vmax"}
            overflow={"hidden"}
            fontSize={"sm"}
          >
            {house.description}
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {house.type === "Rent" ? `₹${house.discountedPrice} / month` : `₹${house.discountedPrice}`}
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              {house.type === "Rent" ? `₹${house.price} / month` : `₹${house.price}`}
            </Text>
          </Stack>
          <Flex gap={"1vmax"}>
            <Text fontWeight={"400"} textTransform={"uppercase"} >{`${house.bedrooms} Beds`}</Text>
            <Text fontWeight={"400"} textTransform={"uppercase"} >{`${house.bathrooms} Baths`}</Text>
          </Flex>
        </Stack>
      </Link>
    </Stack>
  );
}
