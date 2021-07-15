import React from "react";

import { loginReducer, initialState } from "..";
import { AUTH } from "../../actions/consts";
import { IAuthAction } from "../../interface";

describe("testing login reducer", () => {
  test("initial state", () => {
    let expected = loginReducer(initialState, null);
    expect(expected).toBe(initialState);
  });

  test("test pending state", () => {
    let action: IAuthAction = {
      type: `${AUTH.USER_LOGIN}_PENDING`,
      payload: null,
      errors: null,
    };
    let expected = loginReducer(initialState, action);

    expect(expected).toStrictEqual({
      ...initialState,
      status: "PENDING",
    });
  });

  test("test success state", () => {
    let action: IAuthAction = {
      type: `${AUTH.USER_LOGIN}_SUCCESS`,
      payload: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4ZDRhYzhhMzc3YTQzMWNiODIwZjkiLCJlbWFpbCI6ImpleWh1bkBjb2RlLmF6IiwiaWF0IjoxNjI1MjI5OTUyLCJleHAiOjE2MjUyMzM1NTJ9.lufIOMj384Ki0V0-uVoC3JZ02K7ACk2Y68DjqBCZy7U",
        user: {
          _id: "123",
          email: "Test@code.az",
          fullname: "Test Testov",
          role: "User",
        },
      },
      errors: null,
    };
    let expected = loginReducer(initialState, action);

    expect(expected).toStrictEqual({
      ...initialState,
      status: "SUCCESS",
      data: action.payload,
    });
  });

  test("test error state", () => {
    let action: IAuthAction = {
      type: `${AUTH.USER_LOGIN}_ERROR`,
      payload: null,
      errors: ["something went wrong"],
    };
    let expected = loginReducer(initialState, action);

    expect(expected).toStrictEqual({
      ...initialState,
      errors: [action.errors],
      status: "ERROR",
    });
  });
});
