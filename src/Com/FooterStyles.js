import styled from 'styled-components';

export const Box = styled.div`
margin-top:50px;
padding: 10px;
background: black;
// position: absolute;
bottom: 0;
// width: 100%;


@media (max-width: 1000px) {
	// padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	// max-width: 1000px;
    max-width: fit-content;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 30px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 40px;
font-weight: bold;
`;