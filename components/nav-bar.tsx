import {
  Box,
  Flex,
  HStack,
  Link,
  Image,
  Button,
  useDisclosure,
  Stack,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ReactNode } from 'react';

interface NavLinkInterface {
  name: string;
  href: string;
}

const navLinks: NavLinkInterface[] = [
  {name: 'Ver todos os relatórios da participação', href: '/relatorios-participacao'},
]
const NavLink = ({ href, children }: { href: string, children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'green.600',
    }}
    color="white"
    href={href}>
    {children}
  </Link>
);


const NavBar = ({ }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="#004a2f" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Link href='https://camara.leg.br/'>
                <Image src="/relatorios-participacao/logo-brand-camara-desktop.png" />
              </Link>
            </HStack>
            <HStack display={{ base: 'flex', md: 'none' }}>
              <Link href='https://camara.leg.br/'>
                <Image src="/relatorios-participacao/logo-brand-camara-mobile.png" />
              </Link>
            </HStack>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {navLinks.map((navLink) => (
                <NavLink href={navLink.href} key={navLink.name}>{navLink.name}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Box // This is ugly, but it works. 
            w={14}
          />
        </Flex>
        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              {navLinks.map((navLink) => (
                <NavLink href={navLink.href} key={navLink.name}>{navLink.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}

      </Box>
    </>
  );
}

export { NavBar }