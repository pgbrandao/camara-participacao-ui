import {
  Box,
  Flex,
  HStack,
  Link,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NavBar = ({ showReportsButton }) => {
  return (
    <>
      <Box bg="#004a2f" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link href='https://camara.leg.br/'>
              <Image src="/relatorios-participacao/logo-brand-camara-desktop.png" />
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {showReportsButton ? (
              <Link href='/relatorios-participacao'>
                <Button>
                  Ver outros relatórios
                </Button>
              </Link>
            ) : <></>}
          </Flex>

        </Flex>
      </Box>
    </>
  );
}

export { NavBar }