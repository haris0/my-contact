import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ContactFavoriteWrapProps = {
  children?: ReactNode;
  contactLenght?: number;
}

const ContactFavoriteWrap = (props: ContactFavoriteWrapProps) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              Favorite Contact ({props.contactLenght})
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel paddingBottom={4}>
          {props.children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ContactFavoriteWrap;
