"use client";

import { useState, useEffect } from 'react';
import { useGetUsersQuery } from "@/redux/services/userApi";
import Link from 'next/link';
import { User } from './../redux/services/userApi';
import { Button } from '@mantine/core';

import './globals.css'

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentCount, setCurrentCount] = useState(10);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);

  const COUNT_OF_LOAD = 10;

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null); //should send like 1000

  useEffect(() => {
    if (!isLoading && data) {
      data.players.length > 0 && setUsers(data.players)
    }
  }, [data])

  const handleLoadMoreItems = () => {
    setCurrentCount((prev) => prev + COUNT_OF_LOAD)
  }

  useEffect(() => {
    if (currentCount === COUNT_OF_LOAD) {
      users.length > 0 && setVisibleUsers(users.slice(0, COUNT_OF_LOAD));
    } else {
      let start = currentCount;
      let end = currentCount + COUNT_OF_LOAD;
      const newUsers = users.length > 0 && (users.slice(start, end));
      newUsers && setVisibleUsers(prev => [...prev, ...newUsers])
    }
  }, [users, currentCount])

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto" }}>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          {visibleUsers.map((user, index) => (
            <div
              key={index}
              style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
              <Link 
              href={{
                pathname: "/player",
                query: {
                  id: user.puuid,
                  name: user.gameName,
                  tag: user.tagLine
                }
              }}
            >
              <h3>{user.gameName}</h3>
            </Link>
            </div>
          ))}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Button onClick={handleLoadMoreItems}>More Results</Button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
