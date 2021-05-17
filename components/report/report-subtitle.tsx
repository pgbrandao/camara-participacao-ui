
import { Heading, Text } from "@chakra-ui/layout"

export const ReportSubTitle = ({ children }) => {
  return (
    <Heading
      fontSize={{ base: 'lg', sm: 'xl', lg: 'xl' }}
      py={10}
    >
      <Text as={'span'} pl="4">
        {children}
      </Text>
    </Heading>
  )
}

