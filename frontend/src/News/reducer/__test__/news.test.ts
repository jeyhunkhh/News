import React from "react";

import { newsReducer, initialState } from "../../reducer";
import { Action } from "../../actions/actionsType";
import { NEWS_ACTIONS } from "../../actions/consts";

describe("testing news reducer", () => {
  test("initial state", () => {
    let expected = newsReducer(initialState, null);
    expect(expected).toBe(initialState);
  });

  test("test pending state", () => {
    let action: Action = {
      type: `${NEWS_ACTIONS.GET_NEWS}_PENDING`,
      payload: null,
      error: null,
    };
    let expected = newsReducer(initialState, action);

    expect(expected).toStrictEqual({
      ...initialState,
      status: "PENDING",
    });
  });

  test("test success state", () => {
    let action: Action = {
      type: `${NEWS_ACTIONS.GET_NEWS}_SUCCESS`,
      payload: {
        _id: "123",
        title: "Test title",
        content: "Test content",
        categoryId: "1234",
        isSlider: false,
        photo: "uploads\\1305523759.jpg",
        createdAt: "2021-06-28T21:47:12.836Z",
        updatedAt: "2021-06-28T21:47:12.836Z",
        __v: 0,
      },
      error: null,
    };
    let expected = newsReducer(initialState, action);

    expect(expected).toStrictEqual({
      ...initialState,
      status: "SUCCESS",
      data: action.payload,
    });
  });

  test("test error state", () => {
    let action: Action = {
      type: `${NEWS_ACTIONS.GET_NEWS}_ERROR`,
      payload: null,
      error: ["something went wrong"],
    };
    let expected = newsReducer(initialState, action);

    expect(expected).toStrictEqual({
      ...initialState,
      status: "ERROR",
      err: [action.error],
    });
  });
});
