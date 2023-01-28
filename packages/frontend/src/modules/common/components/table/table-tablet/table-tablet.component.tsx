/* eslint-disable react/jsx-curly-newline */
import React from 'react';

import { Switch, Typography } from '@mui/material';

import { Swiper, SwiperSlide, EffectCards } from '../../../../deps';

import 'swiper/css';
import 'swiper/css/effect-cards';

import {
  CustomBox,
  CustomDeleteButton,
  CustomTypography,
  CustomViewButton
} from '../table-todos.styled';

import { ITodo } from '../../../interfaces';

export const TodosTabletComponent = ({ todos, updateTodoMutation, removeTodoMutation }: any) => (
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
