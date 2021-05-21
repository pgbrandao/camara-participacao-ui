import { Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { ReactElement, ReactNode } from "react";

interface FeatureProps {
  icon?: ReactElement;
  indent?: boolean;
  text: string;
}

export const FeatureText = ({ icon, indent, text}: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'} marginTop={2} marginBottom={2} marginLeft={indent ? 5 : 0}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg='gray.100'
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};


export const FeatureHeader = ({ icon, indent, text}: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'} marginTop={14} marginBottom={10} marginLeft={indent ? 40 : 10}>
      <Flex
        w={32}
        h={32}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        // ml={-2}
        mr={6}
        // bg='gray.100'
      >
        {icon}
      </Flex>
        <Heading
          fontSize={{ base: '2xl', sm: '3xl', lg: '3xl' }}
          textAlign='center'
        >
          {text}
        </Heading>

    </Stack>
  );
};

