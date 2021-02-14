/* eslint-disable react/style-prop-object */
/* eslint-disable prettier/prettier */
import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Background>
      <Logo src="../images/logo.png" alt="logo이미지" />
      <Content />
      <MakerTable>
				<Title>developed by bon appetit</Title>
				<thead>
					<tr rowSpan="2">
						<RowTitle>part</RowTitle>
						<RowTitle>name</RowTitle>
						<RowTitle>github</RowTitle>
          </tr>
				</thead>
        <tbody>
					<tr >
						<RowTitle rowSpan="2">front-ent</RowTitle>
						<TableData>김남인</TableData>
						<TableData >
							<GitHub href="https://github.com/southppp22/" >
							https://github.com/southppp22/</GitHub>
						 </TableData>
          </tr>
				<tr>
          <TableData>김지운</TableData>
					<TableData >
							<GitHub href="https://github.com/expectta">
							https://github.com/expectta</GitHub>
						 </TableData>	
        </tr>
				<tr>		
					<RowTitle rowSpan="2">back-end</RowTitle>
          <TableData>송정현</TableData>
					<TableData >
							<GitHub href="https://github.com/atomsong9090/">
							https://github.com/atomsong9090/</GitHub>
						 </TableData>
        </tr>
				<tr>		
          <TableData>김용재</TableData>
					<TableData >
							<GitHub href="https://github.com/JayKim88">
							https://github.com/JayKim88</GitHub>
						 </TableData>
        </tr>
				</tbody>
      </MakerTable>
    </Background>
  );
}
const Background = styled.div`
  background: #0b0b20;
	height: 320px;
	margin-top: 200px;
	text-align: -webkit-center;
`;
const Content = styled.div`
  color: white;
`;
const Logo = styled.img`
  width: 100px;
  margin-top: 20px;
`;
const MakerTable = styled.table`width: 600px;
text-align: center;`;
const TableData = styled.td`color:white;`;
const Title = styled.caption`
color:white;
font-size: 1.2rem;
margin-top: 20px;
margin-bottom: 20px;`;
const RowTitle = styled.th`color:white;`;
const GitHub = styled.a`color:white`;