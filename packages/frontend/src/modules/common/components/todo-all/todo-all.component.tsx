/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';

import {
  Switch,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Container
} from '@mui/material';

import { Swiper, SwiperSlide, EffectCards } from '../../../deps';

import 'swiper/css';
import 'swiper/css/effect-cards';

import {
  CustomDeleteButton,
  CustomEditButton,
  CustomPaper,
  CustomTableCellBig,
  CustomTableCellMedium,
  CustomTableCellSmall,
  CustomTableHeaderCell,
  CustomViewButton,
  CustomTypography,
  CustomBox,
  CustomBoxMobile
} from './todo-all.styled';

import { TodosTableLayout } from '../layout/todo-all';

import { useQuery, useTodos } from '../../hooks';
import { SpinnerComponent } from '../spinner';
import { ErrorComponent } from '../error';
import { SnackBarComponent } from '../error/snackbar/snackbar.component';
import { ISnackBar, ITodo } from '../../interfaces';

export const TodosTableComponent = () => {
  const [snackBar, setSnackBar] = useState<ISnackBar>({
    message: 'Error',
    severity: 'error',
    open: false
  });
  const [todos, setTodos] = useState<ITodo[]>([]);

  const { tablet, desktop, mobile } = useQuery();

  const {
    isError: isErrorMutate,
    error: errorMutate,
    isLoading: isLoadingMutate,
    isSuccess: isSuccessMutate,
    allTodos,
    setTrigger,
    updateTodoMutation,
    removeTodoMutation,
    action
  } = useTodos();
  const { isLoading, isError, error, data } = allTodos;

  const handleSnackBar = (): void => {
    if (isErrorMutate) {
      setSnackBar({
        message: errorMutate?.response?.data?.message || 'Unknown error',
        severity: 'error',
        open: true
      });
    } else {
      setSnackBar({
        message: `Todo ${action}`,
        severity: 'success',
        open: true
      });
    }
  };

  useEffect(() => {
    (isSuccessMutate || isErrorMutate) && handleSnackBar();
  }, [isSuccessMutate, isErrorMutate]);

  useEffect(() => {
    setTodos((data && data[0].data) || []);
  }, [data]);

  const TodosDesktopComponent = (
    <CustomPaper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <CustomTableHeaderCell align="left" colSpan={1}>
                Todo Title
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="left" colSpan={1}>
                Description
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="center" colSpan={3}>
                Actions
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="center" colSpan={1}>
                Completed
              </CustomTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos &&
              todos.map((row: any) => {
                const { title, description, completed, private: privateStatus, _id: id } = row;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    <CustomTableCellMedium align="left">{title}</CustomTableCellMedium>
                    <CustomTableCellBig align="left">{description}</CustomTableCellBig>
                    <CustomTableCellSmall align="center">
                      <CustomViewButton variant="contained" href={`/todo/single-todo/${id}`}>
                        View
                      </CustomViewButton>
                    </CustomTableCellSmall>
                    <CustomTableCellSmall align="center">
                      <CustomEditButton href={`/todo/update-todo/${id}`}>Edit</CustomEditButton>
                    </CustomTableCellSmall>
                    <CustomTableCellSmall align="center">
                      <CustomDeleteButton onClick={() => removeTodoMutation(id)}>
                        Delete
                      </CustomDeleteButton>
                    </CustomTableCellSmall>
                    <CustomTableCellSmall align="center">
                      <Switch
                        onChange={(e) => {
                          updateTodoMutation(
                            {
                              title,
                              description,
                              private: privateStatus,
                              completed: e.target.checked
                            },
                            id
                          );
                        }}
                        defaultChecked={completed}
                      />
                    </CustomTableCellSmall>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomPaper>
  );

  const TodosTabletComponent = (
    <Swiper effect="cards" grabCursor modules={[EffectCards]} className="mySwiper">
      {todos.map((todo: ITodo) => (
        <SwiperSlide key={todo._id}>
          <Typography variant="h3">{todo?.title}</Typography>
          <CustomTypography variant="body1">{todo?.description}</CustomTypography>
          <CustomBox>
            <CustomViewButton variant="contained" href={`/todo/single-todo/${todo._id}`}>
              View
            </CustomViewButton>
            <CustomDeleteButton onClick={() => removeTodoMutation(todo._id)}>
              Delete
            </CustomDeleteButton>
            <Switch
              onChange={(e) => {
                updateTodoMutation(
                  {
                    title: todo.title,
                    description: todo.description,
                    private: todo.private,
                    completed: e.target.checked
                  },
                  todo._id
                );
              }}
              defaultChecked={Boolean(todo.completed)}
            />
          </CustomBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  const TodosMobileComponent = (
    <Container>
      {todos.map((todo: ITodo) => (
        <CustomBoxMobile key={todo._id}>
          <Typography variant="h4">{todo?.title}</Typography>
          <CustomTypography variant="body1">{todo?.description}</CustomTypography>
          <CustomBox>
            <CustomViewButton variant="contained" href={`/todo/single-todo/${todo._id}`}>
              View
            </CustomViewButton>
            <CustomDeleteButton onClick={() => removeTodoMutation(todo._id)}>
              Delete
            </CustomDeleteButton>
            <Switch
              onChange={(e) => {
                updateTodoMutation(
                  {
                    title: todo.title,
                    description: todo.description,
                    private: todo.private,
                    completed: e.target.checked
                  },
                  todo._id
                );
              }}
              defaultChecked={Boolean(todo.completed)}
            />
          </CustomBox>
          <Divider />
        </CustomBoxMobile>
      ))}
    </Container>
  );

  const handleResize = () => {
    if (desktop) return TodosDesktopComponent;
    if (tablet) return TodosTabletComponent;
    if (mobile) return TodosMobileComponent;
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isError ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          {(isLoading || isLoadingMutate) && <SpinnerComponent />}
          <SnackBarComponent snackBar={snackBar} />
          <TodosTableLayout
            setTrigger={setTrigger}
            total={data && data[0].metadata[0] ? data[0].metadata[0].total : 0}
          >
            {handleResize()}
          </TodosTableLayout>
        </>
      )}
    </>
  );
};
