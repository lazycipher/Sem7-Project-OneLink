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
import { DataGrid } from "@material-ui/data-grid";

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
      width: "100%",
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

const Activities = () => {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [activities, setActivities] = useState();
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
    const res = await axios.get(
      "http://localhost:3000/api/v1/user/stats",
      tokenConfig()
    );
    setLoading(false);
    console.log("data: ", data);
    setData(res.data);
    setActivities(res.data.activities);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      {/* Activities */}
      <Paper className={classes.paper} elevation={3}>
        <CenterContainer>
          <Typography variant="button" weight="bold">
            Recent Activities
          </Typography>
        </CenterContainer>
        {loading && (
          <CenterContainer>
            <CircularProgress />
          </CenterContainer>
        )}
        {loading === false && activities && (
          <>
            <TableContainer>
              <Table aria-label="Country-Data">
                <TableHead>
                  <TableRow>
                    <TableCell>Platform</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">Region</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.IP.country}</TableCell>
                      <TableCell align="right">{row.IP.region}</TableCell>
                      <TableCell align="right">{row.IP.city}</TableCell>
                      <TableCell align="right">
                        {new Date(row.activityDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(row.activityDate).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <CenterContainer>
          <Typography variant="button" weight="bold">
            Hits By Country
          </Typography>
        </CenterContainer>
        {loading && (
          <CenterContainer>
            <CircularProgress />
          </CenterContainer>
        )}
        {loading === false && data?.countryWiseHits && (
          <>
            <TableContainer>
              <Table aria-label="Country-Data">
                <TableHead>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell align="right">Hits</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.countryWiseHits.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.country}
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <CenterContainer>
          <Typography variant="button" weight="bold">
            Hits By Region
          </Typography>
        </CenterContainer>
        {loading && (
          <CenterContainer>
            <CircularProgress />
          </CenterContainer>
        )}
        {loading === false && data?.regionWiseHits && (
          <>
            <TableContainer>
              <Table aria-label="Country-Data">
                <TableHead>
                  <TableRow>
                    <TableCell>Region</TableCell>
                    <TableCell align="right">Hits</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.regionWiseHits.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.region}
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Activities;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
