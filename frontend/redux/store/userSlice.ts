import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URLs } from "@/constants/urls";

interface UserState {
  user: any;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

// 🔐 Login Thunk → get accessToken
export const loginUser = createAsyncThunk<
  { accessToken: string },
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (formData, { rejectWithValue }) => {
  try {
    console.log("login form data", formData);

    const res = await axios.post(`${URLs.backend}/api/v1/auth/login`, formData);
    console.log("loginUser res", res);

    return { accessToken: res.data.accessToken };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// 👤 Fetch User from /me with accessToken
export const fetchUserProfile = createAsyncThunk<
  any, // returned user object
  void,
  {
    state: { user: UserState };
    rejectValue: string;
  }
>("user/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  const token = getState().user.accessToken;
  console.log("token for fetching", token);

  try {
    const res = await axios.get(`${URLs.backend}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetch profile res", res);

    localStorage.setItem("authUser", JSON.stringify(res.data.user));
    return res.data.user;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Fetching user failed"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("accessToken");
    },
    setUserFromStorage(state) {
      const savedUser = localStorage.getItem("authUser");
      const savedToken = localStorage.getItem("accessToken");

      if (savedUser) {
        state.user = JSON.parse(savedUser);
      }

      if (savedToken) {
        state.accessToken = savedToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
        // We don't store user yet — only after /me call
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login Failed";
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Coudnot fetch profile";
      });
  },
});

export const { logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
