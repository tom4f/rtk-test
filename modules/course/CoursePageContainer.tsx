"use client";
import { compose } from "recompose";

import CoursePage from "./CoursePage";

import withPlaylistData from "./HOC/withPlaylistData";
import fetchPlaylistOnMount from "./HOC/fetchPlaylistOnMount";

const CoursePageWithData = compose(
  fetchPlaylistOnMount,
  withPlaylistData
)(CoursePage);

export default CoursePageWithData;
