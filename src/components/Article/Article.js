import React from "react";

import { Card, CardContent, Grid, Typography, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import ReactReadMoreReadLess from "react-read-more-read-less";

import styles from "./Article.styles";

const Article = ({ abstract, lead_paragraph, keywords, person }) => {
  const { searchInput } = useSelector((state) => state.article);

  if (abstract && lead_paragraph) {
    return (
      <Card sx={styles.card}>
        <CardContent>
          <>
            <Typography variant="h5">Title</Typography>
            <Highlighter
              searchWords={[searchInput]}
              autoEscape={true}
              textToHighlight={abstract}
            />

            <Typography variant="h5">Description</Typography>
            <ReactReadMoreReadLess
              charLimit={300}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
              readMoreClassName="read-more-less--more"
              readLessClassName="read-more-less--less"
            >
              {lead_paragraph}
            </ReactReadMoreReadLess>
            {keywords.length > 0 && (
              <Typography variant="h5">Keywords: </Typography>
            )}
            {keywords.map((keyword, index) => {
              return (
                <Chip
                  key={index}
                  label={keyword?.value}
                  size="small"
                  variant="outlined"
                />
              );
            })}
            {person.length > 0 && (
              <Typography variant="h5">person: </Typography>
            )}
            {person.map((p, index) => {
              return (
                <Grid key={index}>
                  <Chip
                    key={index}
                    label={p.firstname + " " + p.lastname}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              );
            })}
          </>
        </CardContent>
      </Card>
    );
  }

  return null;
};
export default Article;
