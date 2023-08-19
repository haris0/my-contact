import { useContactList } from "@/modules/contact-list/contactListHooks"
import { Stack, Text } from "@chakra-ui/react"

export default function Contact() {
  const { loading, data } = useContactList({
    limit: 10,
    offset: 1
  });

  return (
    <Stack>
      {loading && (
        <Text>Load Contact...</Text>
      )}
      {!loading && (data?.contact.length || 0) > 0 && (
        <Stack>
          {data?.contact.map((cont) => (
            <Text key={cont.id}>{cont.first_name} {cont.last_name}</Text>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
