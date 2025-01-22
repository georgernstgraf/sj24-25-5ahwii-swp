#!/usr/bin/env python
import sqlite3
import networkx as nx
import numpy as np
from manim import *

class FamilyTreeWithForceLayout(Scene):
    def construct(self):

        # 1) Datenbank-Abfrage
        connection = sqlite3.connect("menschheit.db")
        cursor = connection.cursor()
        cursor.execute("SELECT id, id_mutter, id_vater, name FROM Menschheit")
        rows = cursor.fetchall()
        connection.close()
        # 2) NetworkX-Graph aufbauen
        G = nx.DiGraph()
        for (person_id, id_mutter, id_vater, name) in rows:
            G.add_node(person_id, label=name)
            if id_mutter != 0:
                G.add_edge(id_mutter, person_id, color=RED)
            if id_vater != 0:
                G.add_edge(id_vater, person_id, color=BLUE)
        # 3) Layout berechnen
        pos_2d = nx.spring_layout(
            G,
            k=2.0,
            scale=5.0,
            iterations=200,
            seed=42
        )
        pos_3d = {
            node: np.array([pos_2d[node][0], pos_2d[node][1], 0.0])
            for node in G.nodes()
        }
        # 4) Edges & Edge-Styles
        edges = []
        edge_config = {}
        for (u, v) in G.edges():
            edges.append((u, v))
            edge_config[(u, v)] = {
                "stroke_color": G[u][v]["color"],
                "stroke_width": 3,
            }
        # -------------------------------
        # WICHTIGER TEIL: LABELS + HINTERGRUND
        # -------------------------------
        labels = {}
        for node_id in G.nodes():
            # Text-Objekt erstellen
            label_obj = Text(
                G.nodes[node_id]["label"],
                font_size=20,            # ggf. anpassen
            )
            # Hintergrund-Rechteck hinzufügen
            label_obj.add_background_rectangle(
                color=BLACK,            # Farbe des Rechtecks
                buff=0.1,               # Abstand vom Text
                opacity=0.6             # Halbtransparenz
            )
            labels[node_id] = label_obj
        # 5) Manim-Graph erzeugen
        graph = Graph(
            vertices=list(G.nodes()),
            edges=edges,
            layout=pos_3d,
            layout_config={"scale": 1.0},
            labels=labels,                # Hier deine Label-Dict
            vertex_config={
                "radius": 0.3,
                "color": WHITE,
                "stroke_width": 2,
            },
            edge_config=edge_config,
            edge_type=Arrow,
        )
        # 6) Animation
        self.play(Create(graph))
        self.wait(3)
        self.play(FadeOut(graph))
        self.wait(1)

if __name__ == "__main__":
    app = FamilyTreeWithForceLayout()
    app.construct()