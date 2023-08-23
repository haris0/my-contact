import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { 
  Avatar, 
  Button, 
  Card, 
  CardBody, 
  HStack,
  Stack, 
  Text,
} from "@chakra-ui/react";

type ContactCardProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isFavorite?: boolean;
  onRemove?: () => void;
  onFavorite?: () => void;
}

export const ContactCard = (props: ContactCardProps) => {
  return (
    <Card variant='filled'>
      <CardBody>
        <HStack justifyContent='space-between'>
          <HStack spacing={4}>
            <Avatar name={props.firstName+" "+props.lastName} />
            <Stack spacing={0}>
              <Text>
                {props.firstName} {props.lastName}
              </Text>
              <Text>
                {props.phoneNumber}
              </Text>
            </Stack>
          </HStack>
          <Stack>
            <Button
              onClick={(event) => {
                event.preventDefault();
                props.onFavorite?.();
              }}
              size='xs'
            >
              <StarIcon color={props.isFavorite ? 'yellow.400' : undefined} />
            </Button>
            {props.onRemove && (
              <Button 
                onClick={(event) => {
                  event.preventDefault();
                  props.onRemove?.();
                }}
                size='xs'
              >
                <DeleteIcon />
              </Button>
            )}
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  );
};
