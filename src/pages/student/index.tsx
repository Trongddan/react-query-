import * as React from "react";
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Center,
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import http from "../../http/http";
import { StudentInter, book } from "../../models/Student";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queries } from "@testing-library/react";

export interface StudentProps {}

export default function Student(props: StudentProps) {
  const queryClient = useQueryClient();
  const [name, setname] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [quantity, setQuantity] = useState<number>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading } = useQuery({
    queryKey: ["get-book"],
    queryFn: () => {
      return http.get<StudentInter[]>("/book");
    },
    staleTime: 2000,
    cacheTime: 5000,
  });
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };
  const handleChangeDes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDes(e.target.value);
  };
  const handleChangeSL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };
  const addBook = useMutation({
    mutationFn: (body: book) => {
      return http.post("/book", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["get-book"]});
      onClose()
    },
  });
  const deleteBook = useMutation({
    mutationFn: (id:string)=>{return http.delete(`/book/${id}`)},
    onSuccess: (_,id)=>{
      console.log('xoa thanh cong ',id);
      queryClient.invalidateQueries({queryKey:["get-book"]});

    }
  })
  const handleSubmitAdd = () => {
    const bookForm: book = {
      name: name,
      des: des,
      quantity: quantity as number,
    };
    addBook.mutate(bookForm);
  };
  const handleDelete =(id:string)=>{
    deleteBook.mutate(id)
  }

  return (
    <>
      <Box width="100%">
        <Text as="h3">Danh sách truyện</Text>
        <Button onClick={onOpen} colorScheme="blue">
          Thêm truyện
        </Button>
        {data?.data && !isLoading ? (
          <TableContainer>
            <Table
              w="70%"
              size={"lg"}
              variant="striped"
              colorScheme="teal"
              textAlign="start"
              boxShadow="md"
              p="6"
              rounded="md"
            >
              <Thead>
                <Th textAlign={"start"}>#</Th>
                <Th textAlign={"start"}>Ten truyen</Th>
                <Th textAlign={"start"}>Mo ta</Th>
                <Th textAlign={"start"}>So luong</Th>
                <Th textAlign={"start"}>Thao tác</Th>
              </Thead>
              <Tbody>
                {data?.data?.map((student) => (
                  <Tr key={student._id}>
                    <Td>{student._id}</Td>
                    <Td>{student.name}</Td>
                    <Td>{student.des}</Td>
                    <Td>{student.quantity}</Td>
                    <Td><Button onClick={()=>handleDelete(student._id)} colorScheme="red">Xóa</Button></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Center w={"100%"}>
            <Spinner h={"50px"} w={"50px"} color="red" />
          </Center>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm Truyện</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Tên truyện</FormLabel>
              <Input
                value={name}
                onChange={(e) => handleChangeName(e)}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mô tả</FormLabel>
              <Input
                type="text"
                value={des}
                onChange={(e) => handleChangeDes(e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Số lượng</FormLabel>
              <Input
                value={quantity}
                onChange={(e) => handleChangeSL(e)}
                type="number"
              />
            </FormControl>
            <Button onClick={handleSubmitAdd} mt={5} mb={5} colorScheme="blue">
              Thêm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
