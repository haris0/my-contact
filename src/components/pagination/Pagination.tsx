import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";

type PaginationProps = {
  currectPage: number;
  dataLength: number;
  limit: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Pagination = (props: PaginationProps) => {
  return (
    <HStack
      width='full'
      alignItems='center'
      justifyContent='center'
      padding={4}
    >
      <Button
        leftIcon={<ArrowBackIcon />}
        isDisabled={props.currectPage === 1}
        onClick={props.onPrev}
      >
        Prev
      </Button>
      <Button
        rightIcon={<ArrowForwardIcon />}
        isDisabled={props.dataLength < props.limit}
        onClick={props.onNext}
      >
        Next
      </Button> 
    </HStack>
  );
};
