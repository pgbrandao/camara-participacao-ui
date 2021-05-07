import { Heading, Text } from "@chakra-ui/layout"

const ReportTitle = ({ children }) => {
  return (
    <Heading
      fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}
      py={10}
    >
      <Text as={'span'} pl="4">
        {children}
      </Text>
    </Heading>
  )
}

export { ReportTitle }