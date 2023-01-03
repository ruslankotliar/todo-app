/* eslint-disable react/jsx-curly-newline */
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { Container, Switch, Typography } from '@mui/material';

import {
  CustomBox,
  CustomDeleteButton,
  CustomTypography,
  CustomViewButton
} from '../table-todos.styled';

import { ITodo } from '../../../interfaces';

export const TodosTabletComponent = ({
  todos,
  updateTodoCompleteStatus,
  removeTodoFromDB
}: any) => (
  <Container>
    <Swiper effect="cards" grabCursor modules={[EffectCards]} className="mySwiper">
      {todos.map((todo: ITodo) => (
        <SwiperSlide key={todo._id}>
          <Typography variant="h3">{todo?.title}</Typography>
          <CustomTypography variant="body1">{todo?.description}</CustomTypography>
          <CustomBox>
            <CustomViewButton variant="contained" href={`/todo/${todo._id}`}>
              View
            </CustomViewButton>
            <CustomDeleteButton onClick={() => removeTodoFromDB(todo._id)}>
              Delete
            </CustomDeleteButton>
            <Switch
              onChange={(e) => {
                updateTodoCompleteStatus(
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
  </Container>
);
