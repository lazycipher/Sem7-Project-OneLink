import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { Link as RouterLink } from "react-router-dom";
import { clearErrors } from "../../store/actions/errorActions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import axios from "axios";
import styled from "styled-components";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      padding: "2rem",
      flexDirection: "column",
    },
    paper: {
      padding: theme.spacing(3),
      fontFamily: "roboto",
      marginBottom: "2rem",
    },
    item: {
      marginBottom: theme.spacing(1),
    },
    btnContainer: {
      display: "flex",
    },
    btn: {
      margin: "0 auto",
    },
    socialName: {
      width: "35%",
      marginRight: "5%",
    },
    socialHref: {
      width: "60%",
    },
    avatar: {
      background: "#3f51b5",
    },
  })
);

const Stats = () => {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const tokenConfig = () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  const getData = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/user/stats", tokenConfig());
    setLoading(false);
    console.log("data: ", data);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <CenterContainer>
          <Typography variant="button" weight="bold">
            Daily Traffic Analytics
          </Typography>
        </CenterContainer>
        {loading && (
          <CenterContainer>
            <CircularProgress />
          </CenterContainer>
        )}
        {loading === false && data?.dailyHits && (
          <>
            <ResponsiveContainer maxHeight={500} width={"100%"} aspect={1}>
              <LineChart
                width={500}
                height={300}
                data={data.dailyHits}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="count" />
                <Tooltip />
                <Legend />
                <Line
                  name="Hits"
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <CenterContainer>
          <Typography variant="button" weight="bold">
            Link Analytics
          </Typography>
        </CenterContainer>
        {loading && (
          <CenterContainer>
            <CircularProgress />
          </CenterContainer>
        )}
        {loading === false && data?.linkAnalytics && (
          <>
            <ResponsiveContainer maxHeight={500} width={"100%"} aspect={1}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={data.linkAnalytics}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} />
                <Radar
                  name="Hits"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Stats;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
`;
